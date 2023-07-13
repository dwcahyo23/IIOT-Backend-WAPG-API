import { Op, Sequelize } from 'sequelize'
import { Mad_ord_mast } from '../api/models/Mad_ord_mast'
import { Bas_man_mast } from '../api/models/Bas_man_mast'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'

export default {
  async getPPU(params) {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'pr'),
    )

    const Pu = await Mad_ord_mast.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('ymd')),
            '>=',
            '2023-02-01',
          ),
          {
            check_mark: {
              [Op.eq]: 'N',
            },
            chk_mark: {
              [Op.eq]: 'Y',
            },
          },
        ],
      },
      order: [['sheet_no', 'ASC']],
    })

    if (User.length < 1) {
      error.push({
        type: 'error',
        message: 'User pr not found',
      })
    }

    if (Pu.length < 1) {
      error.push({
        type: 'error',
        message: 'Data mad_ord_mast not found',
      })
    }

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

    if (error.length === 0) {
      _.forEach(User, (field) => {
        _.forEach(Pu, (record, i) => {
          if (_.includes(field.nik, record.check_man)) {
            let message = `*Hello  ${field.gender}. ${field.name}* \n\n`
            if (params.isTime == 'morning') {
              message += `Semangat Pagi!
            \nBerikut PO Outstanding yang perlu diaudit:\n`
            } else {
              message += `Walau sudah siang, kita harus tetap semangat!
            \nBerikut ini ada tambahan PO Outstanding yang perlu diaudit:\n`
            }
            _.forEach(Pu, (record, i) => {
              if (_.includes(field.nik, record.check_man)) {
                message += `\n${i + 1}. ${record.sheet_no} │ ${
                  record.mny_no
                } ${(record.amt * 1).toLocaleString()}`
              }
            })
            message += `\n\nMohon dilakukan verifikasinya ya ${field.gender}. ${field.name},\napabila ada pertanyaan lebih lanjut bisa menghubungi tim purchasing secara langsung.
          \nThank you and have a nice day! 😊`

            sendMsg({ number: field.number, msg: message })
          }
        })
      })
      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
