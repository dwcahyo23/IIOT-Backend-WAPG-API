import { Op, Sequelize } from 'sequelize'
import { MntnWoModel } from '../api/models/Mntn-WoModel'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'
import { format } from 'date-fns'

export default {
  async getOpen() {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'mn'),
    )

    const Wo = await MntnWoModel.findAll({
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

    if (Wo.length < 1) {
      error.push({
        type: 'error',
        message: 'Data mntn-wo open not found',
      })
    }

    if (error.length === 0) {
      _.forEach(User, (field) => {
        _.forEach(Wo, async (record) => {
          let msg = '*_Work Order by Erp_ (Open)❌*\n'
          await axios({
            method: 'post',
            url: 'http://localhost:5010/send-message',
            data: {
              number: field.number,
              message: (msg += `\n*Sheet_no:* ${
                record.sheet_no
              }\n*Stoptime:* ${format(
                new Date(record.ymd),
                'dd MMM yyyy HH:mm',
              )}\n${record.mch_no} | ${record.dep_no} | ${
                record.com_no == '01'
                  ? 'GM1'
                  : record.com_no == '02'
                  ? 'GM2'
                  : record.com_no == '03'
                  ? 'GM3'
                  : 'GM5'
              }\n------------------------------------------
              \n*Problem:* ${record.s_memo}\n*Remarks:* ${
                record.memo
              }\n*Reason:* ${
                record.rsn_no == '00'
                  ? 'Stoptime'
                  : record.rsn_no == '01'
                  ? 'Aus&Retak'
                  : record.rsn_no == '02'
                  ? 'Kecelakaan'
                  : record.rsn_no == '03'
                  ? 'Salah Operasi'
                  : record.rsn_no == '04'
                  ? 'Lalai'
                  : 'Lain-lain'
              } `),
            },
          })

          await MntnWoModel.update(
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

  async getClose() {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'mn'),
    )

    const Wo = await MntnWoModel.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('ymd')),
            '>=',
            '2023-02-08',
          ),
          {
            chk_mark: {
              [Op.eq]: 'Y',
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

    if (Wo.length < 1) {
      error.push({
        type: 'error',
        message: 'Data mntn-wo closed not found',
      })
    }

    if (error.length === 0) {
      _.forEach(User, async (field) => {
        await _.forEach(Wo, (record) => {
          let msg = '*_Work Order by Erp_ (Closed) ✅*\n'
          axios({
            method: 'post',
            url: 'http://localhost:5010/send-message',
            data: {
              number: field.number,
              message: (msg += `\n*Sheet_no:* ${
                record.sheet_no
              }\n*Stoptime:* ${format(
                new Date(record.ymd),
                'dd MMM yyyy HH:mm',
              )}\n${record.mch_no} | ${record.dep_no} | ${
                record.com_no == '01'
                  ? 'GM1'
                  : record.com_no == '02'
                  ? 'GM2'
                  : record.com_no == '03'
                  ? 'GM3'
                  : 'GM5'
              }\n------------------------------------------
              \n*Problem:* ${record.s_memo}\n*Remarks:* ${
                record.memo
              }\n*Reason:* ${
                record.rsn_no == '00'
                  ? 'Stoptime'
                  : record.rsn_no == '01'
                  ? 'Aus&Retak'
                  : record.rsn_no == '02'
                  ? 'Kecelakaan'
                  : record.rsn_no == '03'
                  ? 'Salah Operasi'
                  : record.rsn_no == '04'
                  ? 'Lalai'
                  : 'Lain-lain'
              } `),
            },
          })
        })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
