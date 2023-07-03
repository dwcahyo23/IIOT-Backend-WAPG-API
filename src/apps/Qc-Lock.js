import db from '../api/config/db'
import { QueryTypes } from 'sequelize'
import { Mad_qap_locm } from '../api/models/Mad_qap_locm'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'
import { format } from 'date-fns'

const sendMsg = async (params) => {
  if (params.type == 'group') {
    await axios
      .post('http://localhost:5010/send-message-group', {
        name: params.name,
        message: params.msg,
      })
      .then((res) => console.log(res.status))
      .catch((e) => console.log(e.message))
  } else {
    await axios
      .post('http://localhost:5010/send-message', {
        number: params.number,
        message: params.msg,
      })
      .then((res) => console.log(res.status))
      .catch((e) => console.log(e.message))
  }
}

export default {
  async getLock(params) {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'qc'),
    )

    const Group = _.filter(config.get('ConfigGroups.GroupList'), (el) =>
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
      and
	date(sch_ot.mad_qap_locm.ymd) = CURRENT_DATE
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
        message: 'User qc not found',
      })
    }

    if (Lock.length < 1) {
      error.push({
        message: 'Data qc-lock not found',
      })
    }

    if (error.length === 0) {
      _.forEach(User, async (field) => {
        let msg = `*Hello ${field.gender} ${field.name}*`
        msg += `\nThis is the current state of QC-Lock:\n\n`
        _.forEach(Lock, async (record, i) => {
          msg += `\n*${i + 1}. Sheet_no:* ${record.sheet_no}\n*Product:* ${
            record.pdc_name
          }\n*Travel Card:* ${record.bat_card}\n*Fragment:* ${
            record.bat_card_2
          } | ${record.stk_no_2}\n*Problem:* ${record.problem}\n*Standard:* ${
            record.standard
          }\n*Result:* ${record.result}\n`
          upStsLock({ id: record.sheet_no })
        })
        msg += `\n\nThank you and have a nice day!`
        sendMsg({ number: field.number, msg: msg })
      })

      _.forEach(Group, async (field) => {
        let msg = `*Hello Group ${field.name}*\n`
        msg += `\nThis is the current state of QC-Lock:\n\n`
        _.forEach(Lock, async (record, i) => {
          msg += `\n*${i + 1}. Sheet_no:* ${record.sheet_no}\n*Product:* ${
            record.pdc_name
          }\n*Travel Card:* ${record.bat_card}\n*Fragment:* ${
            record.bat_card_2
          } | ${record.stk_no_2}\n\n*Problem:* ${record.problem}\n*Standard:* ${
            record.standard
          }\n*Result:* ${record.result}\n`
        })
        msg += `\n\nThank you!`
        sendMsg({ name: field.name, msg: msg, type: 'group' })
      })

      return { type: 'succes', message: 'message sended successfully' }
    }
    return error
  },
}
