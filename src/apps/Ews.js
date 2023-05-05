import { Op, Sequelize } from 'sequelize'
import { MntnWoModel } from '../api/models/Mntn-WoModel'
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
  async getCritical() {},
}
