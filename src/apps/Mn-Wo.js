// import { Op, Sequelize } from 'sequelize'
// import { MntnWoModel } from '../api/models/Mntn-WoModel'
// import config from 'config'
// import _, { isNull } from 'lodash'
// import axios from 'axios'
// import { format } from 'date-fns'

// const sendMsg = async (params) => {
//   if (params.type == 'group') {
//     await axios
//       .post('http://192.168.192.7:5010/send-message-group', {
//         name: params.name,
//         message: params.msg,
//       })
//       .then((res) => console.log(res.status))
//       .catch((e) => console.log(e.message))
//   } else {
//     await axios
//       .post('http://192.168.192.7:5010/send-message', {
//         number: params.number,
//         message: params.msg,
//       })
//       .then((res) => console.log(res.status))
//       .catch((e) => console.log(e.message))
//   }
// }

// export default {
//   async getOpen() {
//     const error = []
//     const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
//       _.includes(el.set, 'mn'),
//     )

//     const Wo = await MntnWoModel.findAll({
//       where: {
//         [Op.and]: [
//           Sequelize.where(
//             Sequelize.fn('date', Sequelize.col('ymd')),
//             '>=',
//             format(new Date(), 'yyyy-MM-dd'),
//           ),
//           {
//             sts_wa: {
//               [Op.eq]: 'N',
//             },
//           },
//         ],
//       },
//       order: [['ymd', 'ASC']],
//     })

//     const upStsWa = async (params) => {
//       await MntnWoModel.update(
//         { sts_wa: 'Y' },
//         {
//           where: {
//             sheet_no: params.id,
//           },
//         },
//       )
//     }

//     if (User.length < 1) {
//       error.push({
//         message: 'User not found',
//       })
//     }

//     if (Wo.length < 1) {
//       error.push({
//         message: 'Data mntn-wo open not found',
//       })
//     }

//     if (error.length === 0) {
//       _.forEach(Wo, async (record) => {
//         _.forEach(User, (field) => {
//           if (
//             _.includes(field.plant, record.com_no) &&
//             _.includes(field.dep_no, record.dep_no)
//           ) {
//             let msg = `*Sheet_no:* ${record.sheet_no} (Open)❌`
//             msg += `\n\nHello ${field.gender} ${field.name}, This is the current state of Work-Order MN:`
//             msg += `\n\n*Stoptime:* ${format(
//               new Date(record.ymd),
//               'dd MMM yyyy HH:mm',
//             )}\n*Machine:* ${record.mch_no} | ${record.dep_no} | ${
//               record.com_no == '01'
//                 ? 'GM1'
//                 : record.com_no == '02'
//                 ? 'GM2'
//                 : record.com_no == '03'
//                 ? 'GM3'
//                 : 'GM5'
//             }\n*Priority:* ${
//               record.pri_no == '01'
//                 ? 'Breakdown time'
//                 : record.pri_no == '02'
//                 ? 'Mesin tetap beroperasi'
//                 : record.pri_no == '03'
//                 ? 'Prev & Pred'
//                 : 'Workshop'
//             }\n*Problem:* ${record.s_memo}\n*Remarks:* ${
//               record.memo
//             }\n*Reason:* ${
//               record.rsn_no == '00'
//                 ? 'Stoptime'
//                 : record.rsn_no == '01'
//                 ? 'Aus&Retak'
//                 : record.rsn_no == '02'
//                 ? 'Kecelakaan'
//                 : record.rsn_no == '03'
//                 ? 'Salah Operasi'
//                 : record.rsn_no == '04'
//                 ? 'Lalai'
//                 : 'Lain-lain'
//             } `
//             sendMsg({ number: field.number, msg: msg })
//             upStsWa({ id: record.sheet_no })
//             // console.log(JSON.stringify(User))
//           } else if (
//             record.com_no == '01' &&
//             record.com_no == '03' &&
//             (record.mch_no == '-' || _.isNull(record.mch_no))
//           ) {
//             let msg = `*Sheet_no:* ${record.sheet_no} (Open)❌`
//             msg += `\n\nHello, This is the current state of Work-Order MN:`
//             msg += `\n\n*Stoptime:* ${format(
//               new Date(record.ymd),
//               'dd MMM yyyy HH:mm',
//             )}\n*Machine:* ${record.mch_no} | ${record.dep_no} | ${
//               record.com_no == '01'
//                 ? 'GM1'
//                 : record.com_no == '02'
//                 ? 'GM2'
//                 : record.com_no == '03'
//                 ? 'GM3'
//                 : 'GM5'
//             }\n*Priority:* ${
//               record.pri_no == '01'
//                 ? 'Breakdown time'
//                 : record.pri_no == '02'
//                 ? 'Mesin tetap beroperasi'
//                 : record.pri_no == '03'
//                 ? 'Prev & Pred'
//                 : 'Workshop'
//             }\n*Problem:* ${record.s_memo}\n*Remarks:* ${
//               record.memo
//             }\n*Reason:* ${
//               record.rsn_no == '00'
//                 ? 'Stoptime'
//                 : record.rsn_no == '01'
//                 ? 'Aus&Retak'
//                 : record.rsn_no == '02'
//                 ? 'Kecelakaan'
//                 : record.rsn_no == '03'
//                 ? 'Salah Operasi'
//                 : record.rsn_no == '04'
//                 ? 'Lalai'
//                 : 'Lain-lain'
//             } `
//             sendMsg({ number: '08128284903', msg: msg })
//             upStsWa({ id: record.sheet_no })
//           } else {
//             ;('')
//           }
//         })
//       })
//       return { message: 'message WO Open sended successfully' }
//     }

//     return error
//   },

//   async getClose() {
//     //! minta perubahan / tambahan field pada postgree ketika sudah kirim wo closed
//     const error = []
//     const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
//       _.includes(el.set, 'mn'),
//     )

//     const Group = _.filter(config.get('ConfigGroups.GroupList'), (el) =>
//       _.includes(el.set, 'mn'),
//     )

//     const Wo = await MntnWoModel.findAll({
//       where: {
//         [Op.and]: [
//           Sequelize.where(
//             Sequelize.fn('date', Sequelize.col('ymd')),
//             '>=',
//             '2023-07-01',
//           ),
//           {
//             chk_mark: {
//               [Op.eq]: 'Y',
//             },
//             sts_wa2: {
//               [Op.eq]: 'n',
//             },
//           },
//         ],
//       },
//       order: [['ymd', 'ASC']],
//     })

//     const upStsWa = async (params) => {
//       await MntnWoModel.update(
//         { sts_wa2: 'Y' },
//         {
//           where: {
//             sheet_no: params.id,
//           },
//         },
//       )
//     }

//     if (Wo.length > 0) {
//       _.forEach(Wo, async (record) => {
//         _.forEach(User, (field) => {
//           if (
//             _.includes(field.plant, record.com_no) &&
//             _.includes(field.dep_no, record.dep_no)
//           ) {
//             let msg = `Sheet: ${
//               record.sheet_no
//             } (Closed) ✅\nStoptime: ${format(
//               new Date(record.ymd),
//               'dd MMM yyyy HH:mm',
//             )}\nMachine: ${record.mch_no} | ${record.dep_no} | ${
//               record.com_no == '01'
//                 ? 'GM1'
//                 : record.com_no == '02'
//                 ? 'GM2'
//                 : record.com_no == '03'
//                 ? 'GM3'
//                 : 'GM5'
//             }\n*Priority:* ${
//               record.pri_no == '01'
//                 ? 'Breakdown time'
//                 : record.pri_no == '02'
//                 ? 'Mesin tetap beroperasi'
//                 : record.pri_no == '03'
//                 ? 'Prev & Pred'
//                 : 'Workshop'
//             }\nProblem: ${record.s_memo}\nRemarks: ${record.memo}\nReason: ${
//               record.rsn_no == '00'
//                 ? 'Stoptime'
//                 : record.rsn_no == '01'
//                 ? 'Aus&Retak'
//                 : record.rsn_no == '02'
//                 ? 'Kecelakaan'
//                 : record.rsn_no == '03'
//                 ? 'Salah Operasi'
//                 : record.rsn_no == '04'
//                 ? 'Lalai'
//                 : 'Lain-lain'
//             }`
//             sendMsg({ number: field.number, msg: msg })
//             upStsWa({ id: record.sheet_no })
//             // console.log(JSON.stringify(User))
//           }
//         })
//       })

//       return { message: 'message wo close sended successfully' }
//     } else {
//       return { message: 'data mntn-wo closed not found' }
//     }
//   },
// }
