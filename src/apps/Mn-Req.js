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

export default {
  async MnReq() {
    const req = await MaintenanceRequest.findAll({
      where: { sts_wa1: 'N' },
      order: [['sheet_no', 'ASC']],
    })

    const Group = _.filter(config.get('ConfigGroups.GroupList'), (el) =>
      _.includes(el.set, 'mn'),
    )

    const user = await AuthData.findAll({})

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

    if (req.length > 0) {
      _.forEach(Group, (val) => {
        let msg = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
      })
    }

    // const result = _.map(req, (val) => {
    //   return {
    //     ...val.dataValues,
    //     user: _.find(user, { displayName: val.user_req1 }),
    //   }
    // })

    // if (result.length > 0) {
    //   let msg = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
    //   msg += `\n\nPermintaan Sparepart: 🔧`
    //   _.forEach(result, (val, i) => {
    //     msg += `\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
    //       val.category_request
    //     }\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
    //     msg += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
    //     msg += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
    //     msg += `\n*Machine:* ${val.mch_code} ${val.mch_com}\n`

    //     let msg1 = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
    //     msg1 += `\n\nPermintaan Sparepart: 🔧`
    //     msg1 += `\n*Sheet:* ${val.sheet_no} | ${val.category_request}\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
    //     msg1 += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
    //     msg1 += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
    //     msg1 += `\n*Machine:* ${val.mch_code} ${val.mch_com}\n`

    //     val.user?.userNumber &&
    //       sendMsg({ number: val.user.userNumber, msg: msg1 })
    //     // val.user?.userNumber && sendMsg({ number: '082124610363', msg: msg1 })

    //     upStsWa({ uuid_request: val.uuid_request })
    //   })

    //   sendMsg({ number: '081382466660', msg: msg })
    //   sendMsg({ number: '085163121617', msg: msg })
    //   sendMsg({ number: '081280540525', msg: msg })
    //   sendMsg({ number: '089614789761', msg: msg })
    // }
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
          { sts_wa1: 'Y' },
          { sts_wa2: 'N' },
          { item_ready: 'N' },
        ],
      },
      order: [['sheet_no', 'ASC']],
    })
    const user = await AuthData.findAll({})

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
        user: _.find(user, { displayName: val.user_req1 }),
      }
    })

    if (result.length > 0) {
      let msg = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
      msg += `\n\nSparepart sudah terbit MRE ya, silahkan dicek 📝`
      _.forEach(result, async (val, i) => {
        msg += `\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
          val.category_request
        }\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
        msg += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
        msg += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
        msg += `\n*Machine:* ${val.mch_code} ${val.mch_com}`
        msg += `\n*Mre:* ${val.mre_request}\n`

        let msg1 = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
        msg1 += `\n\nSparepart sudah terbit MRE ya, silahkan dicek 📝`
        msg1 += `\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
          val.category_request
        }\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
        msg1 += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
        msg1 += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
        msg1 += `\n*Machine:* ${val.mch_code} ${val.mch_com}`
        msg1 += `\n*Mre:* ${val.mre_request}\n`

        val.user?.userNumber &&
          sendMsg({ number: val.user.userNumber, msg: msg1 })

        await upStsWa({ uuid_request: val.uuid_request })
      })
      sendMsg({ number: '081382466660', msg: msg })
      sendMsg({ number: '085163121617', msg: msg })
      sendMsg({ number: '081280540525', msg: msg })
      sendMsg({ number: '089614789761', msg: msg })
    }
  },

  async MnReqRdy() {
    const req = await MaintenanceRequest.findAll({
      where: {
        [Op.and]: [{ sts_wa1: 'Y' }, { item_ready: 'Y' }, { sts_wa3: 'N' }],
      },
      order: [['sheet_no', 'ASC']],
    })

    const user = await AuthData.findAll({})

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
        user: _.find(user, { displayName: val.user_req1 }),
      }
    })

    if (result.length > 0) {
      let msg = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
      msg += `\n\nSparepart sudah digudang ya, silahkan diambil ✅`
      _.forEach(result, async (val, i) => {
        msg += `\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
          val.category_request
        }\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
        msg += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
        msg += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
        msg += `\n*Machine:* ${val.mch_code} ${val.mch_com}`
        msg += `\n*Item Ready:* ${val.item_ready}\n`

        let msg1 = `Penanganan Sparepart Maintenance\n(IK-03-03-11)`
        msg1 += `\n\nSparepart sudah digudang ya, silahkan diambil ✅`
        msg1 += `\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
          val.category_request
        }\n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
        msg1 += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
        msg1 += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
        msg1 += `\n*Machine:* ${val.mch_code} ${val.mch_com}`
        msg1 += `\n*Item Ready:* ${val.item_ready}\n`

        val.user?.userNumber &&
          sendMsg({ number: val.user.userNumber, msg: msg1 })

        await upStsWa({ uuid_request: val.uuid_request })
      })
      sendMsg({ number: '081382466660', msg: msg })
      sendMsg({ number: '085163121617', msg: msg })
      sendMsg({ number: '081280540525', msg: msg })
      sendMsg({ number: '089614789761', msg: msg })
    }
  },
}
