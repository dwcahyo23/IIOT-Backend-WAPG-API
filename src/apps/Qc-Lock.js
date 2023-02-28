import db from '../api/config/db'
import { QueryTypes } from 'sequelize'
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

    const Lock = await db.query(
      //where +: date(sch_ot.mad_qap_locm.ymd) = CURRENT_DATE and
      `SELECT 
      sch_ot.mad_qap_locm.*, 
      sch_ot.bas_pdc_mast.pdc_name 
    FROM 
      sch_ot.mad_qap_locm 
      join sch_ot.bas_pdc_mast on sch_ot.mad_qap_locm.pdc_code = sch_ot.bas_pdc_mast.pdc_code 
    where       
      sts_wa = 'N' 
    order by 
      sch_ot.mad_qap_locm.ymd asc`,
      { type: QueryTypes.SELECT },
    )

    const upStsLock = async (params) => {
      await Mad_qap_locm.update(
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
        type: 'error',
        message: 'User not found',
      })
    }

    if (Lock.length < 1) {
      error.push({
        type: 'error',
        message: 'Data qc-lock not found',
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
        let msg = `*Good day! ${field.gender} ${field.name}*\n`
        msg += `\nBerikut info QC-Lock saat ini:\n\n-----------------------------------------------------------------`
        _.forEach(Lock, async (record, i) => {
          msg += `\n*${i + 1}. Sheet_no:* ${record.sheet_no}\nProduct: ${
            record.pdc_name
          }\nTravel Card: ${record.bat_card}\nFragment: ${
            record.bat_card_2
          } | ${record.stk_no_2}\n\nProblem: ${record.problem}\nStandard: ${
            record.standard
          }\nResult: ${
            record.result
          }\n-----------------------------------------------------------------`
          upStsLock({ id: record.sheet_no })
        })
        msg += `\n\nThank you and have a nice day! 😊`
        sendMsg({ number: field.number, msg: msg })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }
    return error
  },
}
