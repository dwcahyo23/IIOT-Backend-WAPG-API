import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'

import path from 'path'
import TableRenderer, { saveImage } from 'table-renderer'
const renderTable = TableRenderer().render

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

const fetchSparepart = (params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          `http://192.168.192.7:5000/sprtbreakdown/${params.cat}/${params.com}`,
        )
        .then((x) => {
          console.log('fetch sprtbreakdown')
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

const sendMsgGroup = async (name, msg) => {
  axios
    .post('http://192.168.192.7:5010/send-message-group', {
      name: 'GM1 PENANGANAN SPAREPART',
      // number: '082124610363',
      name: name,
      message: msg,
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
            if (_.isArray(val.msg) && val.msg.length > 0) {
              _.forEach(val.msg, (msgContext) => {
                let msg = `${msgContext.sheet_no} \`${msgContext.mch_no}\``
                msg += `\nHello Mr.${val.name}`
                msg += `\n\n${
                  msgContext.pri_no == '01' || msgContext.pri_no == '1'
                    ? '*Breakdown* Open❌'
                    : msgContext.pri_no == '02' || msgContext.pri_no == '2'
                    ? '*Still Run* Open❌'
                    : msgContext.pri_no == '03' || msgContext.pri_no == '3'
                    ? '*Preventive* Open❌'
                    : msgContext.pri_no == '04' || msgContext.pri_no == '4'
                    ? '*Workshop Still Run* Open❌'
                    : msgContext.pri_no == '05' || msgContext.pri_no == '5'
                    ? '*Workshop Breakdown* Open❌'
                    : msgContext.pri_no == '06' || msgContext.pri_no == '6'
                    ? '*Project (Machinery)* Open❌'
                    : msgContext.pri_no == '07' || msgContext.pri_no == '7'
                    ? '*Project (Workshop)* Open❌'
                    : 'undefined'
                }`
                msg += `\n*Machine :* \`${msgContext.mch_no}\` | ${
                  msgContext?.mch_index?.mch_name
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
                msg += `\n*Problem:* \`${msgContext.s_memo}\` \n*Remarks:* ${msgContext.memo}`
                sendMsgUser({ number: val.number, msg: msg })
              })
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
            if (_.isArray(val.msg) && val.msg.length > 0) {
              _.forEach(val.msg, (msgContext, numberContext) => {
                let msg = `${msgContext.sheet_no} \`${msgContext.mch_no}\``
                msg += `\nHello Mr.${val.name}`
                msg += `\n\n${
                  msgContext.pri_no == '01' || msgContext.pri_no == '1'
                    ? '*Breakdown* Closed✅'
                    : msgContext.pri_no == '02' || msgContext.pri_no == '2'
                    ? '*Still Run* Closed✅'
                    : msgContext.pri_no == '03' || msgContext.pri_no == '3'
                    ? '*Preventive* Closed✅'
                    : msgContext.pri_no == '04' || msgContext.pri_no == '4'
                    ? '*Workshop Still Run* Closed✅'
                    : msgContext.pri_no == '05' || msgContext.pri_no == '5'
                    ? '*Workshop Breakdown* Closed✅'
                    : msgContext.pri_no == '06' || msgContext.pri_no == '6'
                    ? '*Project (Machinery)* Closed✅'
                    : msgContext.pri_no == '07' || msgContext.pri_no == '7'
                    ? '*Project (Workshop)* Closed✅'
                    : 'undefined'
                }`
                msg += `\n*Machine :* ${msgContext.mch_no} | ${
                  msgContext?.mch_index?.mch_name
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
                msg += `\n*Problem:* \`${msgContext.s_memo}\` \n*Remarks:* ${msgContext.memo}`
                sendMsgUser({ number: val.number, msg: msg })
              })
            } else {
              console.log('news worderClose not found')
            }
          })
        })
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },

  async getfetchSparepartGM1(props) {
    try {
      await fetchSparepart(props).then((data) => {
        const category = () => {
          switch (props.cat) {
            case '01':
              return 'BREAKDOWN'
            case '02':
              return 'STILL RUN'
            case '03':
              return 'PREVENTIVE'
            case '04':
              return 'WORKSHOP STILL RUN'
            case '05':
              return 'WORKSHOP BREAKDOWN'
            default:
              return ''
          }
        }

        const isReady = (pros) => {
          switch (pros) {
            case 'Y':
              return 'Ready✅'

            default:
              return ''
          }
        }

        const isPo = (pros) => {
          switch (pros) {
            case 'Y':
              return `_(SUDAH PO)_`

            default:
              return ''
          }
        }

        const isAudit = (pros) => {
          switch (pros) {
            case 'Y':
              return 'Audit✅'

            default:
              return 'NAudit❌'
          }
        }

        let msg = `*REMAINDER PERMINTAAN SPAREPART ${category()}*:`
        _.forEach(data, (msgContext, i) => {
          msg += `\n\n*${i + 1}. ${msgContext.index} \`${category()}\` :*`
          _.forEach(msgContext.sheet_no, (a, b) => {
            msg += `\n\n> Work Order :`
            msg += `\n- No.WO : ${a.j}`
            msg += `\n- Problem : ${a.h[0].memo}`
            msg += `\n- Stop : ${dayjs(a.h[0].ymd).format('DD/MM/YYYY HH:mm')}`
            msg += `\n- Status Wo : ${isAudit(a.h[0].chk_mark)}`
            msg += `\n> PERMINTAAN :`
            msg += `\n- No.Permintaan : ${a.h[0].sheet_no}`
            msg += `\n- Status Permintaan : NAudit❌`
            _.forEach(a.h, (j, h) => {
              msg += `\n- \`${j.stock}\` ${j.request_qty} ${j.request_uom} *${j.mre_request}*`
            })
            msg += `\n> PUR SHEET NO :`
            if (a.i.length == 0)
              msg += `\n- ERP \`pur_sheet_no\` is not yet in sync`
            _.forEach(a.i, (x, y) => {
              msg += `\n- \`${x.mat_name}\` *${x.pur_sheet_no}* ETA: ${dayjs(
                x.eta_ymd,
              ).format('DD-MM-YYYY')} ${isPo(x.ove_mk)}`
            })
          })
        })
        sendMsgGroup(props.group, msg)

        if (props.com == 'GM1' && props.cat == '01') {
          sendMsgUser({ number: '08170891399', msg: msg })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  async RemainderSparepartTable(props) {
    try {
      await fetchSparepart(props).then(async (data) => {
        const category = () => {
          switch (props.cat) {
            case '01':
              return 'BREAKDOWN'
            case '02':
              return 'STILL RUN'
            case '03':
              return 'PREVENTIVE'
            case '04':
              return 'WORKSHOP STILL RUN'
            case '05':
              return 'WORKSHOP BREAKDOWN'
            default:
              return ''
          }
        }

        const isReady = (pros) => {
          switch (pros) {
            case 'Y':
              return 'Ready✅'

            default:
              return ''
          }
        }

        const isPo = (pros) => {
          switch (pros) {
            case 'Y':
              return `_(SUDAH PO)_`

            default:
              return ''
          }
        }

        const isAudit = (pros) => {
          switch (pros) {
            case 'Y':
              return 'Audit✅'

            default:
              return 'NAudit❌'
          }
        }

        // console.log(JSON.stringify(data, null, 2))
        let render = [
          {
            title: 'Remainder',
            columns: [
              { width: 50, title: 'No', dataIndex: 'no' },
              { width: 100, title: 'MACHINE', dataIndex: 'mch' },
              { width: 200, title: 'AP-SHEET', dataIndex: 'sheet' },
              {
                width: 700,
                title: 'REQ',
                dataIndex: 'request',
              },
              { width: 100, title: 'QTY', dataIndex: 'qty', align: 'right' },
              { width: 100, title: 'UOM', dataIndex: 'uom', align: 'right' },
              { width: 200, title: 'MRE', dataIndex: 'mre', align: 'right' },
              { width: 200, title: 'ETA', dataIndex: 'eta', align: 'right' },
            ],
            dataSource: [],
          },
        ]

        let number = 1

        await _.forEach(data, (a, i) => {
          _.forEach(a.sheet_no, (b) => {
            _.forEach(b.h, (c) => {
              // _.forEach(b.i, (d) => {
              render[0].dataSource.push('-')
              render[0].dataSource.push({
                no: number++,
                sheet: b.j,
                mch: a.index,
                request: c.stock,
                qty: c.request_qty,
                uom: c.request_uom,
                mre: c.mre_request,
                // eta: _.find(b.i, { pur_sheet_no: c.mre_request }),
                //   eta: dayjs(d.eta_ymd).format('DD-MM-YYYY'),
                // })
              })
            })
          })
        })

        const canvas = renderTable(render)

        const dataURL = canvas.toDataURL()
        console.log(dataURL)

        saveImage(canvas, path.join(__dirname, 'table1.png'))
      })
    } catch (error) {
      console.log(error)
    }
  },
}
