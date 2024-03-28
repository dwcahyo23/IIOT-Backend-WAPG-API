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

let iPerson = 10 * 1000 // 5 seconds;
let iMsg = 3 * 1000 // 2 seconds;

function log(msg) {
  return console.log(msg)
}

function priOpen(prop) {
  if (prop === '01' || prop === '1') return '❌ Breakdown (Open)'

  if (prop === '02' || prop === '2') return '❌ Still Run (Open)'

  if (prop === '03' || prop === '3') return '❌ Preventive (Open)'

  if (prop === '04' || prop === '4') return '❌ Workshop Run (Open)'

  if (prop === '05' || prop === '5') return '❌ Workshop Breakdown (Open)'

  if (prop === '06' || prop === '6') return '❌ Project Machinery (Open)'

  if (prop === '07' || prop === '7') return '❌ Project Workshop (Open)'
}

function priClose(prop) {
  if (prop === '01' || prop === '1') return '✅ Breakdown (Close)'

  if (prop === '02' || prop === '2') return '✅ Still Run (Close)'

  if (prop === '03' || prop === '3') return '✅ Preventive (Close)'

  if (prop === '04' || prop === '4') return '✅ Workshop Run (Close)'

  if (prop === '05' || prop === '5') return '✅ Workshop Breakdown (Close)'

  if (prop === '06' || prop === '6') return '✅ Project Machinery (Close)'

  if (prop === '07' || prop === '7') return '✅ Project Workshop (Close)'
}

function comNo(prop) {
  switch (prop) {
    case '01':
      return 'GM1'
    case '02':
      return 'GM12'
    case '03':
      return 'GM3'
    case '06':
      return 'GM5'

    default:
      return ''
  }
}

export default {
  async testProp() {
    return await priClose('04')
  },

  async WorkOrderOpen() {
    newsOpen()
      .then((data) => {
        data.forEach((wo, i) => {
          setTimeout(
            (i) => {
              if (wo.msg.length < 1) return log(`no open ${wo.name}`)
              wo.msg.forEach((context, x) => {
                setTimeout(
                  function (x) {
                    let msg = `${context.sheet_no} \`${context.mch_no}\``
                    msg += `\nHi Mr. ${wo.name}`
                    msg += `\n${priOpen(context.pri_no)}`
                    msg += `\n- *Mch:* \`${context.mch_no}\` ${context.mch_index?.mch_name}`
                    msg += `\n- *Com:* ${comNo(context.pri_no)}`
                    msg += `\n- *Open:* ${dayjs(context.appe_time).format(
                      'DD/MM/YYYY HH:mm',
                    )}`
                    msg += `\n- *Problem:* ${context.s_memo}`
                    msg += `\n- *Remarks:* ${context.memo}`
                    msg += `\n- *Input By:* ${context.appe_user}`

                    sendMsgUser({ number: wo.number, msg: msg })
                  },
                  iMsg * x,
                  x,
                )
              })
            },
            iPerson * i,
            i,
          )
        })
      })
      .catch((err) => console.log(err))
  },

  async WorkOrderClose() {
    newsClose()
      .then((data) => {
        data.forEach((wo, i) => {
          setTimeout(
            (i) => {
              if (wo.msg.length < 1) return log(`no close ${wo.name}`)
              wo.msg.forEach((context, x) => {
                setTimeout(
                  function (x) {
                    let msg = `${context.sheet_no} \`${context.mch_no}\``
                    msg += `\nHi Mr. ${wo.name}`
                    msg += `\n${priClose(context.pri_no)}`
                    msg += `\n- *Mch:* \`${context.mch_no}\` ${context.mch_index?.mch_name}`
                    msg += `\n- *Com:* ${comNo(context.pri_no)}`
                    msg += `\n- *Open:* ${dayjs(context.appe_time).format(
                      'DD/MM/YYYY HH:mm',
                    )}`
                    msg += `\n- *Close:* ${dayjs(context.chk_date).format(
                      'DD/MM/YYYY HH:mm',
                    )}`
                    msg += `\n- *Total:* ${dayjs(context.chk_date)
                      .diff(dayjs(context.appe_time), 'h', true)
                      .toFixed(1)} hour ⏱`
                    msg += `\n- *Problem:* ${context.s_memo}`
                    msg += `\n- *Remarks:* ${context.memo}`
                    msg += `\n- *Input By:* ${context.appe_user}`

                    sendMsgUser({ number: wo.number, msg: msg })
                  },
                  iMsg * x,
                  x,
                )
              })
            },
            iPerson * i,
            i,
          )
        })
      })
      .catch((err) => console.log(err))
  },

  async getfetchSparepartGM(props) {
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
              return `_(ove mk)_`

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
            // msg += `\n- No.Permintaan : ${a.h[0].sheet_no}`
            msg += `\n- Status Permintaan : NAudit❌`
            _.forEach(a.h, (j, h) => {
              msg += `\n- \`${j.stock}\` (${j.request_qty} ${j.request_uom}) *${j.mre_request}*`
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
          setTimeout(() => {
            sendMsgUser({ number: '08170891399', msg: msg })
          }, iPerson)
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
