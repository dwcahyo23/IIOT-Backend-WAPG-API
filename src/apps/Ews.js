import { Op, Sequelize } from 'sequelize'
import { Ews } from '../api/models/Ews'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'

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
  async getCritical() {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'ews'),
    )

    const ews = await Ews.findAll({
      where: {
        subcon_qty: {
          [Op.lt]: 0,
        },
      },
    })

    if (User.length < 1) {
      error.push({
        message: 'User ews not found',
      })
    }

    if (ews.length < 1) {
      error.push({
        message: 'Data ews not found',
      })
    }
    let iPerson = 5 * 1000 // 5 seconds;

    if (error.length === 0) {
      User.forEach((field, i) => {
        setTimeout(
          function (i) {
            let msg = `*Hello ${field.gender} ${field.name}*\n`
            msg += `\n> This is critical info from EWS:`
            _.forEach(ews, async (record, x) => {
              msg += `\n*${x + 1}. Cust:* ${record.cst_no}`
              msg += `\n- *Part No:* ${record.part_no}`
              msg += `\n- *Part Name:* ${record.part_name}`
              msg += `\n- *Qty Order:* ${(
                record.qty_order * 1
              ).toLocaleString()}`
              msg += `\n- *Qty WDO:* ${(record.wdo_qty * 1).toLocaleString()}`
              msg += `\n- *Qty FG:* ${(record.fg_qty * 1).toLocaleString()}`
              msg += `\n- *Qty Transit:* ${(
                record.trs_qty * 1
              ).toLocaleString()}`
              msg += `\n- *Qty PK:* ${(record.pk_qty * 1).toLocaleString()}`
              msg += `\n- *Qty WIP3:* ${(record.wip3_qty * 1).toLocaleString()}`
              msg += `\n- *Qty WIP:* ${(record.wip_qty * 1).toLocaleString()}`
              msg += `\n- *Qty ASRS:* ${(record.asrs_qty * 1).toLocaleString()}`
              msg += `\n- *Qty Subcon:* ${(
                record.subcon_qty * 1
              ).toLocaleString()}\n`
            })
            sendMsg({ number: field.number, msg: msg })
          },
          iPerson * i,
          i,
        )
      })
      return console.log({ message: 'message EWS sended successfully' })
    }
    return console.log(error)
  },
}
