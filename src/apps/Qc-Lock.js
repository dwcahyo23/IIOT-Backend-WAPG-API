import db from '../api/config/db'
import { QueryTypes } from 'sequelize'
import { Mad_qap_locm } from '../api/models/Mad_qap_locm'
import _ from 'lodash'
import axios from 'axios'
import dayjs from 'dayjs'

const sendMsgUser = async (params) => {
  await axios
    .post('http://192.168.192.7:5010/send-message', {
      number: params.number,
      message: params.msg,
    })
    .then((res) => console.log(res.status))
    .catch((e) => console.log(e.message))
}

export default {
  async getLock() {
    const error = []

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

    if (Lock.length < 1) {
      error.push({
        message: 'Data qc-lock not found',
      })
    }

    let iPerson = 5 * 1000 // 5 seconds;
    let iMsg = 2 * 1000 // 2 seconds;

    const user = [
      { number: '082124610363' },
      { number: '08170891399' },
      { number: '081381159279' },
      { number: '081387503504' },
    ]

    if (error.length === 0) {
      let msg
      _.forEach(Lock, async (record, i) => {
        msg = `\n> *${i + 1}. Sheet_no:* ${record.sheet_no} ❌`
        msg += `\n- *Product:* ${record.pdc_name}`
        msg += `\n- *Travel Card:* ${record.bat_card}`
        msg += `\n- *Fragment:* ${record.bat_card_2} || ${record.stk_no_2} `
        msg += `\n- *Date:* ${dayjs(record.appe_time).format(
          'DD/MM/YYYY HH:mm',
        )}`
        msg += `\n\n> *Issue:* `
        msg += `\n- *Problem:* ${record.problem}`
        msg += `\n- *Standard:* ${record.standard}`
        msg += `\n- *Result:* ${record.result}`
        msg += `\n------------------------------------`
        upStsLock({ id: record.sheet_no })
      })

      user.forEach((x, i) => {
        setTimeout(
          function (i) {
            sendMsgUser({ number: x.number, msg: msg })
          },
          iPerson * i,
          i,
        )
      })

      return console.log({ message: 'message qc lock sended successfully' })
    }

    return console.log(error)
  },
}
