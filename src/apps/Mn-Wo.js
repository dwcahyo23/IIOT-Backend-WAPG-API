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
            format(new Date(), 'yyyy-MM-dd'),
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

    const upStsWa = async (params) => {
      await MntnWoModel.update(
        { sts_wa: 'Y' },
        {
          where: {
            sheet_no: params.id,
          },
        },
      )
    }

    if (User.length < 1) {
      error.push({
        message: 'User not found',
      })
    }

    if (Wo.length < 1) {
      error.push({
        message: 'Data mntn-wo open not found',
      })
    }

    const sendMsg = async (params) => {
      await axios({
        method: 'post',
        url: 'http://192.168.192.7:5010/send-message',
        data: {
          number: params.number,
          message: params.msg,
        },
      })
    }

    if (error.length === 0) {
      _.forEach(Wo, async (record) => {
        _.forEach(User, (field) => {
          if (
            _.includes(field.plant, record.com_no) &&
            _.includes(field.dep_no, record.dep_no)
          ) {
            let msg = `*Sheet_no:* ${record.sheet_no} (Open)❌`
            msg += `\n\nHello ${field.gender} ${field.name}, Below is the current info of WO Open:`
            msg += `\n\n*Stoptime:* ${format(
              new Date(record.ymd),
              'dd MMM yyyy HH:mm',
            )}\n*Machine:* ${record.mch_no} | ${record.dep_no} | ${
              record.com_no == '01'
                ? 'GM1'
                : record.com_no == '02'
                ? 'GM2'
                : record.com_no == '03'
                ? 'GM3'
                : 'GM5'
            }\n*Priority:* ${
              record.pri_no == '01'
                ? 'Breakdown time'
                : record.pri_no == '02'
                ? 'Mesin tetap beroperasi'
                : record.pri_no == '03'
                ? 'Prev & Pred'
                : 'Workshop'
            }\n*Problem:* ${record.s_memo}\n*Remarks:* ${
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
            } `
            sendMsg({ number: field.number, msg: msg })
            upStsWa({ id: record.sheet_no })
            // console.log(JSON.stringify(User))
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
            '2023-03-08',
          ),
          {
            chk_mark: {
              [Op.eq]: 'Y',
            },
            sts_wa2: {
              [Op.eq]: 'n',
            },
          },
        ],
      },
      order: [['ymd', 'ASC']],
    })

    const upStsWa = async (params) => {
      await MntnWoModel.update(
        { sts_wa2: 'Y' },
        {
          where: {
            sheet_no: params.id,
          },
        },
      )
    }

    if (User.length < 1) {
      error.push({
        message: 'User not found',
      })
    }

    if (Wo.length < 1) {
      error.push({
        message: 'Data mntn-wo closed not found',
      })
    }

    const sendMsg = async (params) => {
      await axios({
        method: 'post',
        url: 'http://192.168.192.7:5010/send-message',
        data: {
          number: params.number,
          message: params.msg,
        },
      })
    }

    if (error.length === 0) {
      _.forEach(User, async (field) => {
        let msg = `Hello ${field.gender} ${field.name}\n`
        msg += `\nBelow is the current info of WO Close:`
        _.forEach(Wo, async (record, i) => {
          if (
            _.includes(field.plant, record.com_no) &&
            _.includes(field.dep_no, record.dep_no)
          ) {
            msg += `\n${i + 1}. Sheet: ${
              record.sheet_no
            } (Closed) ✅\nStoptime: ${format(
              new Date(record.ymd),
              'dd MMM yyyy HH:mm',
            )}\nMachine: ${record.mch_no} | ${record.dep_no} | ${
              record.com_no == '01'
                ? 'GM1'
                : record.com_no == '02'
                ? 'GM2'
                : record.com_no == '03'
                ? 'GM3'
                : 'GM5'
            }\n*Priority:* ${
              record.pri_no == '01'
                ? 'Breakdown time'
                : record.pri_no == '02'
                ? 'Mesin tetap beroperasi'
                : record.pri_no == '03'
                ? 'Prev & Pred'
                : 'Workshop'
            }\nProblem: ${record.s_memo}\nRemarks: ${record.memo}\nReason: ${
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
            }${
              Wo.length - 1 == i
                ? '\n'
                : '\n--------------------------------------------'
            }`
          }
          upStsWa({ id: record.sheet_no })
        })
        msg += `\nThank you and have a nice day! 😊`

        sendMsg({ number: field.number, msg: msg })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }

    return error
  },
}
