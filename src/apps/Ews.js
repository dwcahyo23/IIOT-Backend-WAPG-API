import { Op, Sequelize } from 'sequelize'
import { Ews } from '../api/models/Ews'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'
import { format } from 'date-fns'

const sendMsg = async (params) => {
  if (params.type == 'group') {
    await axios({
      method: 'post',
      url: 'http://192.168.192.7:5010/send-message-group',
      data: {
        name: params.name,
        message: params.msg,
      },
    })
  } else {
    await axios({
      method: 'post',
      url: 'http://192.168.192.7:5010/send-message',
      data: {
        number: params.number,
        message: params.msg,
      },
    })
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
        message: 'User not found',
      })
    }

    if (ews.length < 1) {
      error.push({
        message: 'Data ews not found',
      })
    }
    if (error.length === 0) {
      _.forEach(User, async (field) => {
        let msg = `*Hello ${field.gender} ${field.name}*\n`
        msg += `\nBelow is the current info of EWS:\n\n`
        _.forEach(ews, async (record, i) => {
          msg += `\n*${i + 1}. Part_no:* ${record.part_no} | ${
            record.part_name
          } | ${record.subcon_qty}\n`
        })
        msg += `\n\nThank you and have a nice day!`
        sendMsg({ number: field.number, msg: msg })
      })
      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
