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
            '2023-02-10',
          ),
          {
            sts_wa: {
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
        message: 'Data mntn-wo open not found',
      })
    }

    const sendMsg = async (params) => {
      await axios({
        method: 'post',
        url: 'http://localhost:5010/send-message',
        data: {
          number: params.number,
          message: params.msg,
        },
      })
    }

    if (error.length === 0) {
      _.forEach(Wo, async (record) => {
        _.forEach(User, (field) => {
          if (_.includes(field.plant, record.com_no)) {
            let msg = `Good day! ${field.gender} ${field.name}\n`
            msg += `\nBerikut info Wo-Open saat ini:\n------------------------------------------------------------------`
            msg += `\nSheet_no: ${
              record.sheet_no
            } (Open)❌\n\nStoptime: ${format(
              new Date(record.ymd),
              'dd MMM yyyy HH:mm',
            )}\n\nMachine: ${record.mch_no} | ${record.dep_no} | ${
              record.com_no == '01'
                ? 'GM1'
                : record.com_no == '02'
                ? 'GM2'
                : record.com_no == '03'
                ? 'GM3'
                : 'GM5'
            }\n\nProblem: ${record.s_memo}\n\nRemarks: ${
              record.memo
            }\n\nReason: ${
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
            } `
            sendMsg({ number: field.number, msg: msg })
          }
        })
      })
      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },

  async getClose() {
    //! minta perubahan / tambahan field pada postgree ketika sudah kirim wo closed
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
            '2023-02-09',
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

    const sendMsg = async (params) => {
      await axios({
        method: 'post',
        url: 'http://localhost:5010/send-message',
        data: {
          number: params.number,
          message: params.msg,
        },
      })
    }

    if (error.length === 0) {
      _.forEach(User, async (field) => {
        let msg = `Good day! ${field.gender} ${field.name}\n`
        msg += `\nBerikut info Wo-Close saat ini:\n\n-----------------------------------------------------------------`
        _.forEach(Wo, async (record, i) => {
          if (_.includes(field.plant, record.com_no)) {
            msg += `\n${i + 1}. Sheet: ${
              record.sheet_no
            } (Closed) ✅\n\nStoptime: ${format(
              new Date(record.ymd),
              'dd MMM yyyy HH:mm',
            )}\n\nMachine: ${record.mch_no} | ${record.dep_no} | ${
              record.com_no == '01'
                ? 'GM1'
                : record.com_no == '02'
                ? 'GM2'
                : record.com_no == '03'
                ? 'GM3'
                : 'GM5'
            }
            \n\nProblem: ${record.s_memo}\n\nRemarks: ${
              record.memo
            }\\nnReason: ${
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
            }\n----------------------------------------------------------------- `
          }
        })
        msg += `\n\nThank you and have a nice day! 😊`
        sendMsg({ number: field.number, msg: msg })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
