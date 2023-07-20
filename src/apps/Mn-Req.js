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

    const result = _.map(req, (val) => {
      return {
        ...val.dataValues,
      }
    })

    const upStsWa = async (params) => {
      await MaintenanceRequest.update(
        { sts_wa1: 'Y' },
        {
          where: {
            sheet_no: params.id,
          },
        },
      )
    }

    let msg = `AP Request Spare Part Maintenance`
    _.forEach(result, (val, i) => {
      msg += `\n\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
        val.category_request
      } \n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
      msg += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
      msg += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
      msg += `\n*Machine:* ${val.mch_code} ${val.mch_com}`

      upStsWa({ id: val.sheet_no })
    })

    sendMsg({ number: '081382466660', msg: msg })
    sendMsg({ number: '085163121617', msg: msg })
    sendMsg({ number: '081280540525', msg: msg })
  },

  async MnReqMre() {
    const req = await MaintenanceRequest.findAll({
      where: { sts_wa1: 'Y', sts_wa2: 'N', sts_wa3: 'N' },
      order: [['sheet_no', 'ASC']],
    })

    const result = _.filter(req, (val) => {
      val.mre_req.length > 0
    })

    console.log(result)

    const upStsWa = async (params) => {
      await MaintenanceRequest.update(
        { sts_wa2: 'Y' },
        {
          where: {
            sheet_no: params.id,
          },
        },
      )
    }

    // let msg = `AP Request Spare Part Maintenance`
    // _.forEach(result, (val, i) => {

    //   msg += `\n\n*${i + 1}. Sheet:* ${val.sheet_no} | ${
    //     val.category_request
    //   } \n*Sparepart:* ${val.item_stock} \n*Remaks:* ${val.item_name}`
    //   msg += `\n*Qty:* ${val.item_qty} ${val.item_uom}\n*User:* ${val.user_req1}`
    //   msg += `\n*Target:* ${dayjs(val.date_request).format('DD-MM-YYYY')}`
    //   msg += `\n*Machine:* ${val.mch_code} ${val.mch_com}`
    //   msg += `\n*MRE:* ${val.mre_request} `

    //   upStsWa({ id: val.sheet_no })
    // })

    // sendMsg({ number: '082124610363', msg: msg })
  },
}
