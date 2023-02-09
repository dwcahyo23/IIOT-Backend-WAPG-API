import { Op, Sequelize } from 'sequelize'
import { Mad_ord_mast } from '../api/models/Mad_ord_mast'
import config from 'config'
import _ from 'lodash'
import axios, { Axios } from 'axios'
import { isAfter, set } from 'date-fns'

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
          },
        ],
      },
      order: [['ymd', 'ASC']],
    })

    if (User.length < 1) {
      error.push({
        type: 'error',
        message: 'User not found',
      })
    }

    if (Pu.length < 1) {
      error.push({
        type: 'error',
        message: 'Data mad_ord_mast not found',
      })
    }

    if (error.length === 0) {
      _.forEach(User, (field) => {
        let message = `*Halo  ${field.gender}. ${field.name}* \n\n`
        if (params.isTime == 'morning') {
          message += `Semangat Pagi!
          \nBerikut PO Outstandng yang perlu diaudit:`
        } else {
          message += `Walau sudah siang, kita harus tetap semangat!
          \nBerikut ini ada tambahan PO Outstanding yang perlu diaudit: `
        }
        _.forEach(Pu, (record, i) => {
          message += `\n ${i + 1}. ${record.sheet_no} | Amount ${
            record.mny_no
          } `
        })
        message += `\n\nMohon dilakukan verifikasinya ya ${field.gender}. ${field.name},\napabila ada pertanyaan lebih lanjut bisa menghubungi tim purchasing secara langsung.
        \nThank you and have a nice day! 😊`
        axios({
          method: 'post',
          url: 'http://localhost:5010/send-message',
          data: {
            number: field.number,
            message,
          },
        })
      })
      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
