import { Op, Sequelize } from 'sequelize'
import { Mad_qap_locm } from '../api/models/Mad_qap_locm'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'
import { format } from 'date-fns'

export default {
  async getLock(params) {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'qc'),
    )

    const Lock = Mad_qap_locm.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('ymd')),
            '>=',
            '2023-02-08',
          ),
          {
            sts_wa: {
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

    if (Lock.length < 1) {
      error.push({
        type: 'error',
        message: 'Data mntn-wo open not found',
      })
    }

    if (error.length === 0) {
      _.forEach(User, (field) => {
        _.forEach(Lock, async (record, i) => {
          let msg = `*Halo ${field.gender} ${field.name}*\n`
          msg += `Good day!\n Berikut info QC-Lock saat ini:\n`
          msg += `${i + 1}. ${sheet_no} |`
          await axios({
            method: 'post',
            url: 'http://localhost:5010/send-message',
            data: {
              number: field.number,
              message: msg,
            },
          })

          await Mad_qap_locm.update(
            { sts_wa: 'Y' },
            {
              where: {
                sheet_no: record.sheet_no,
              },
            },
          )
        })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
