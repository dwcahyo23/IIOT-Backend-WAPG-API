import { Op, Sequelize } from 'sequelize'
import config from 'config'
import { MaintenanceRequest, AuthData } from '../api/models/Maintenance_System'
import _ from 'lodash'
import axios from 'axios'
import dayjs from 'dayjs'

const sendMsg = async (params) => {
  if (params.type == 'group') {
    await axios
      .post('http://192.168.192.7:5010/send-message-group', {
        name: params.name,
        message: params.msg,
      })
      .then((res) => console.log(res.status))
      .catch((e) => console.log(e.message))
  } else {
    await axios
      .post('http://192.168.192.7:5010/send-message', {
        number: params.number,
        message: params.msg,
      })
      .then((res) => console.log(res.status))
      .catch((e) => console.log(e.message))
  }
}

const Group = _.filter(config.get('ConfigGroups.GroupList'), (el) =>
  _.includes(el.set, 'mn_req2'),
)

export default {
  async MnReq() {
    const req = await MaintenanceRequest.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('createdAt')),
            '>=',
            dayjs().format('YYYY-MM-DD'),
          ),
          {
            sts_wa1: {
              [Op.eq]: 'N',
            },
            sts_wa2: {
              [Op.eq]: 'N',
            },
            sts_wa3: {
              [Op.eq]: 'N',
            },
            mch_com: {
              [Op.eq]: 'GM2',
            },
          },
        ],
      },
      order: [['sheet_no', 'ASC']],
    })

    const upStsWa = async (params) => {
      await MaintenanceRequest.update(
        { sts_wa1: 'Y' },
        {
          where: {
            uuid_request: params.uuid_request,
          },
        },
      )
    }

    const result = _.map(req, (val) => {
      return {
        ...val.dataValues,
      }
    })

    if (req.length > 0) {
      const d = _.chain(result)
        .groupBy((val) => (val.sheet_no ? val.sheet_no : 'fail'))
        .mapValues((items) =>
          items.map((entry) => {
            return _.pick(entry, [
              'item_stock',
              'item_name',
              'item_qty',
              'item_uom',
              'mch_code',
              'user_req1',
              'category_request',
              'uuid_request',
            ])
          }),
        )
        .value()

      _.forEach(Group, (val) => {
        let msg = `*Penanganan Sparepart Maintenance*\n*(IK-03-03-11)*`
        msg += `\n\nPermintaan Sparepart GM2: 🔧`
        _.forEach(_.keys(d), (entry, idx) => {
          if (entry != 'pass') {
            msg += `\n\n*${idx + 1}. ${entry} ${d[entry][0].category_request}*`
            msg += ` \n${d[entry][0].mch_code} | ${d[entry][0].user_req1}`
            msg += `\nItem :`
            _.forEach(d[entry], (items, index) => {
              msg += `\n${index + 1}. ${
                _.isNull(items.item_stock) == false
                  ? items.item_stock
                  : items.name
              } (${items.item_qty} ${items.item_uom})`

              upStsWa({ uuid_request: items.uuid_request })
            })
          }
        })
        // console.log(msg)
        sendMsg({ name: val.name, msg: msg, type: 'group' })
      })
    }
  },

  async MnReqMRE() {
    const req = await MaintenanceRequest.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('char_length', Sequelize.col('mre_request')),
            {
              [Op.gt]: 3,
            },
          ),
          {
            mre_request: {
              [Op.like]: 'MRE%',
            },
          },
          {
            sts_wa1: {
              [Op.eq]: 'Y',
            },
            sts_wa2: {
              [Op.eq]: 'N',
            },
            sts_wa3: {
              [Op.eq]: 'N',
            },
            mch_com: {
              [Op.eq]: 'GM2',
            },
          },
        ],
      },
      order: [['sheet_no', 'ASC']],
    })

    const upStsWa = async (params) => {
      await MaintenanceRequest.update(
        { sts_wa2: 'Y' },
        {
          where: {
            uuid_request: params.uuid_request,
          },
        },
      )
    }

    const result = _.map(req, (val) => {
      return {
        ...val.dataValues,
      }
    })

    if (req.length > 0) {
      const d = _.chain(result)
        .groupBy((val) => (val.sheet_no ? val.sheet_no : 'fail'))
        .mapValues((items) =>
          items.map((entry) => {
            return _.pick(entry, [
              'item_stock',
              'item_name',
              'item_qty',
              'item_uom',
              'mch_code',
              'user_req1',
              'category_request',
              'uuid_request',
              'mre_request',
              'item_ready',
            ])
          }),
        )
        .value()

      _.forEach(Group, (val) => {
        let msg = `*Penanganan Sparepart Maintenance*\n*(IK-03-03-11)*`
        msg += `\n\nSparepart sudah terbit MRE ya, silahkan dicek`
        _.forEach(_.keys(d), (entry, idx) => {
          if (entry != 'pass') {
            msg += `\n\n*${idx + 1}. ${entry} ${d[entry][0].category_request}*`
            msg += ` \n${d[entry][0].mch_code} | ${d[entry][0].user_req1}`
            msg += `\n*MRE: ${d[entry][0].mre_request}* 📝`
            msg += `\nItem :`
            _.forEach(d[entry], (items, index) => {
              msg += `\n${index + 1}. ${
                _.isNull(items.item_stock) == false
                  ? items.item_stock
                  : items.name
              } (${items.item_qty} ${items.item_uom})`

              upStsWa({ uuid_request: items.uuid_request })
            })
          }
        })
        // console.log(msg)
        sendMsg({ name: val.name, msg: msg, type: 'group' })
      })
    }
  },

  async MnReqRdy() {
    const req = await MaintenanceRequest.findAll({
      where: {
        [Op.and]: [{ sts_wa1: 'Y' }, { item_ready: 'Y' }, { sts_wa3: 'N' }],
      },
      order: [['sheet_no', 'ASC']],
    })

    const upStsWa = async (params) => {
      await MaintenanceRequest.update(
        { sts_wa3: 'Y' },
        {
          where: {
            uuid_request: params.uuid_request,
          },
        },
      )
    }

    const result = _.map(req, (val) => {
      return {
        ...val.dataValues,
      }
    })

    if (req.length > 0) {
      const d = _.chain(result)
        .groupBy((val) => (val.sheet_no ? val.sheet_no : 'fail'))
        .mapValues((items) =>
          items.map((entry) => {
            return _.pick(entry, [
              'item_stock',
              'item_name',
              'item_qty',
              'item_uom',
              'mch_code',
              'user_req1',
              'category_request',
              'uuid_request',
              'mre_request',
              'item_ready',
            ])
          }),
        )
        .value()

      _.forEach(Group, (val) => {
        let msg = `*Penanganan Sparepart Maintenance*\n*(IK-03-03-11)*`
        msg += `\n\nSparepart sudah digudang ya, silahkan diambil ✅`
        _.forEach(_.keys(d), (entry, idx) => {
          if (entry != 'pass') {
            msg += `\n\n*${idx + 1}. ${entry} ${d[entry][0].category_request}*`
            msg += ` \n${d[entry][0].mch_code} | ${d[entry][0].user_req1}`
            msg += `\nItem :`
            _.forEach(d[entry], (items, index) => {
              msg += `\n${index + 1}. ${
                _.isNull(items.item_stock) == false
                  ? items.item_stock
                  : items.name
              } (${items.item_qty} ${items.item_uom})`

              upStsWa({ uuid_request: items.uuid_request })
            })
          }
        })
        // console.log(msg)
        sendMsg({ name: val.name, msg: msg, type: 'group' })
      })
    }
  },
}
