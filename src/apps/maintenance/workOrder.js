import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'

const newsOpen = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get('http://192.168.192.7:5000/newsWorderOpen')
        .then((x) => {
          console.log('fetch newsWorderOpen')
          resolve(x.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (err) {
      {
        console.log(err)
        reject(err)
      }
    }
  })
}

const newsClose = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get('http://192.168.192.7:5000/newsWorderClose')
        .then((x) => {
          console.log('fetch newsWorderClose')
          resolve(x.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (err) {
      {
        console.log(err)
        reject(err)
      }
    }
  })
}

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
  async getOpen() {
    try {
      newsOpen()
        .then((data) => {
          // console.log(data)
          _.forEach(data, (val) => {
            let msg = `Hello ${val.name}, this is the current state of *Work Order Open* :`
            _.forEach(val.msg, (msgContext, numberContext) => {
              msg += `\n\n${numberContext + 1}.*${msgContext.sheet_no}* | ${
                msgContext.pri_no == '01' || msgContext.pri_no == '1'
                  ? '*Breakdown* ❌'
                  : msgContext.pri_no == '02' || msgContext.pri_no == '2'
                  ? '*Still Run* ⌛️'
                  : msgContext.pri_no == '03' || msgContext.pri_no == '3'
                  ? '*Preventive* 🔧'
                  : msgContext.pri_no == '04' || msgContext.pri_no == '4'
                  ? '*Workshop Still Run* ⌛️'
                  : msgContext.pri_no == '05' || msgContext.pri_no == '5'
                  ? '*Workshop Breakdown* ❌'
                  : msgContext.pri_no == '06' || msgContext.pri_no == '6'
                  ? '*Project (Machinery)* 🔧'
                  : msgContext.pri_no == '07' || msgContext.pri_no == '7'
                  ? '*Project (Workshop)* 🔧'
                  : 'undefined'
              }`
              msg += `\n*Machine :* ${msgContext.mch_no} | ${
                msgContext.dep_no
              } | ${
                msgContext.com_no == '01'
                  ? 'GM1'
                  : msgContext.com_no == '02'
                  ? 'GM2'
                  : msgContext.com_no == '03'
                  ? 'GM3'
                  : msgContext.com_no == '06'
                  ? 'GM5'
                  : 'undefined'
              }`
              msg += `\n*Open :* ${dayjs(msgContext.ymd).format(
                'DD/MM/YYYY HH:mm',
              )}`
              msg += `\n*Problem:* ${msgContext.s_memo}\n*Remarks:* ${msgContext.memo}`
            })
            if (_.isArray(val.msg) && val.msg.length > 0) {
              sendMsgUser({ number: val.number, msg: msg })
            } else {
              console.log('news worderOpen not found')
            }
          })
        })
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },

  async getClose() {
    try {
      await newsClose()
        .then((data) => {
          _.forEach(data, (val) => {
            let msg = `Hallo ${val.name}, this is the current state of *Work Order Close* :`
            _.forEach(val.msg, (msgContext, numberContext) => {
              msg += `\n\n${numberContext + 1}.*${msgContext.sheet_no}* | ${
                msgContext.pri_no == '01' || msgContext.pri_no == '1'
                  ? '*Breakdown* ✅'
                  : msgContext.pri_no == '02' || msgContext.pri_no == '2'
                  ? '*Still Run* ✅'
                  : msgContext.pri_no == '03' || msgContext.pri_no == '3'
                  ? '*Preventive* ✅'
                  : msgContext.pri_no == '04' || msgContext.pri_no == '4'
                  ? '*Workshop Still Run* ✅'
                  : msgContext.pri_no == '05' || msgContext.pri_no == '5'
                  ? '*Workshop Breakdown* ✅'
                  : msgContext.pri_no == '06' || msgContext.pri_no == '6'
                  ? '*Project (Machinery)* ✅'
                  : msgContext.pri_no == '07' || msgContext.pri_no == '7'
                  ? '*Project (Workshop)* ✅'
                  : 'undefined'
              }`
              msg += `\n*Machine :* ${msgContext.mch_no} | ${
                msgContext.dep_no
              } | ${
                msgContext.com_no == '01'
                  ? 'GM1'
                  : msgContext.com_no == '02'
                  ? 'GM2'
                  : msgContext.com_no == '03'
                  ? 'GM3'
                  : msgContext.com_no == '06'
                  ? 'GM5'
                  : 'undefined'
              }`
              msg += `\n*Open :* ${dayjs(msgContext.ymd).format(
                'DD/MM/YYYY HH:mm',
              )}`
              msg += `\n*Close :* ${dayjs(msgContext.chk_date).format(
                'DD/MM/YYYY HH:mm',
              )}`
              msg += `\n*Total time :* ${dayjs(msgContext.chk_date)
                .diff(dayjs(msgContext.ymd), 'h', true)
                .toFixed(1)} hour ⏱`
              msg += `\n*Problem:* ${msgContext.s_memo}\n*Remarks:* ${msgContext.memo}`
            })

            if (_.isArray(val.msg) && val.msg.length > 0) {
              sendMsgUser({ number: val.number, msg: msg })
            } else {
              console.log('news worderOpen not found')
            }
          })
        })
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },
}
