import schedule from 'node-schedule'

// import PRPo from '../PR-Po'
import QcLock from '../Qc-Lock'
import Ews from '../Ews'
import { format } from 'date-fns'
import workOrder from '../maintenance/workOrder'

export default {
  async getScheduler() {
    //! Job Scheduler Reguler
    const openJob = schedule.scheduleJob('1 * * * * *', function () {
      // !update from user
      workOrder
        .getOpen()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const closeJob = schedule.scheduleJob('30 * * * * *', function () {
      // !update from user
      workOrder
        .getClose()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const getSprarepart1 = schedule.scheduleJob('1 0 8 * * 1-5', function () {
      workOrder
        .getfetchSparepartGM1({
          cat: '01',
          com: 'GM1',
          group: 'GM1 PENANGANAN SPAREPART',
        })
        .then(() =>
          workOrder.getfetchSparepartGM1({
            cat: '03',
            com: 'GM1',
            group: 'GM1 PENANGANAN SPAREPART',
          }),
        )
        .catch((err) => console.log(err))

      workOrder
        .getfetchSparepartGM1({
          cat: '01',
          com: 'GM2',
          group: 'GM2 PENANGANAN SPAREPART',
        })
        .then(() =>
          workOrder.getfetchSparepartGM1({
            cat: '03',
            com: 'GM2',
            group: 'GM2 PENANGANAN SPAREPART',
          }),
        )
        .catch((err) => console.log(err))
    })

    // const getSprarepart2 = schedule.scheduleJob('1 0 13 * * 1-5', function () {
    //   workOrder
    //     .getfetchSparepartGM1({
    //       cat: '01',
    //       com: 'GM1',
    //       group: 'GM1 PENANGANAN SPAREPART',
    //     })
    //     .then(() =>
    //       workOrder.getfetchSparepartGM1({
    //         cat: '03',
    //         com: 'GM1',
    //         group: 'GM1 PENANGANAN SPAREPART',
    //       }),
    //     )
    //     .catch((err) => console.log(err))
    // })

    const getSprarepart3 = schedule.scheduleJob('1 0 17 * * 1-5', function () {
      workOrder
        .getfetchSparepartGM1({
          cat: '01',
          com: 'GM1',
          group: 'GM1 PENANGANAN SPAREPART',
        })
        .then(() =>
          workOrder.getfetchSparepartGM1({
            cat: '03',
            com: 'GM1',
            group: 'GM1 PENANGANAN SPAREPART',
          }),
        )
        .catch((err) => console.log(err))
    })

    // //! Job Scheduler EWS 2H
    const ews1 = schedule.scheduleJob('1 0 8 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))

      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const ews2 = schedule.scheduleJob('1 0 10 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))

      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const ews3 = schedule.scheduleJob('1 0 13 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))

      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const ews4 = schedule.scheduleJob('1 0 15 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))

      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const ews5 = schedule.scheduleJob('1 0 17 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))

      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    schedule.scheduleJob('1 0 19 * * *', function () {
      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    schedule.scheduleJob('1 0 21 * * *', function () {
      QcLock.getLock()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })
  },
}
