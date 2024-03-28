import schedule from 'node-schedule'

// import PRPo from '../PR-Po'
import QcLock from '../Qc-Lock'
import Ews from '../Ews'
import { format } from 'date-fns'
import workOrder from '../maintenance/workOrder'

export default {
  async getScheduler() {
    //! Job Scheduler Reguler
    const OpenWO = schedule.scheduleJob('1 * * * * *', function () {
      // !update from user
      workOrder.WorkOrderOpen()
    })

    const CloseWo = schedule.scheduleJob('20 * * * * *', function () {
      // !update from user
      workOrder.WorkOrderClose()
    })

    //! Remainder Sparepart

    const getSprarepart1 = schedule.scheduleJob('3 0 8 * * 1-5', function () {
      workOrder
        .getfetchSparepartGM({
          cat: '01',
          com: 'GM1',
          group: 'GM1 PENANGANAN SPAREPART',
        })
        .catch((err) => console.log(err))
    })

    const getSprarepart2 = schedule.scheduleJob('5 0 8 * * 1-5', function () {
      workOrder
        .getfetchSparepartGM({
          cat: '01',
          com: 'GM2',
          group: 'GM2 PENANGANAN SPAREPART',
        })
        .catch((err) => console.log(err))
    })

    //! Job Scheduler EWS 2H

    const ews1 = schedule.scheduleJob('15 0 8 * * *', function () {
      Ews.getCritical()
    })

    const ews2 = schedule.scheduleJob('15 0 10 * * *', function () {
      Ews.getCritical()
    })

    const ews3 = schedule.scheduleJob('15 0 13 * * *', function () {
      Ews.getCritical()
    })

    const ews4 = schedule.scheduleJob('15 0 15 * * *', function () {
      Ews.getCritical()
    })

    const ews5 = schedule.scheduleJob('15 0 17 * * *', function () {
      Ews.getCritical()
    })

    //! Job Scheduler QC Lock

    const qclock1 = schedule.scheduleJob('17 0 8 * * *', function () {
      QcLock.getLock()
    })

    const qcLock2 = schedule.scheduleJob('17 0 10 * * *', function () {
      QcLock.getLock()
    })

    const qclock3 = schedule.scheduleJob('17 0 13 * * *', function () {
      QcLock.getLock()
    })

    const qclock4 = schedule.scheduleJob('17 0 15 * * *', function () {
      QcLock.getLock()
    })

    const qclock5 = schedule.scheduleJob('1 0 17 * * *', function () {
      QcLock.getLock()
    })

    const qclock6 = schedule.scheduleJob('1 0 19 * * *', function () {
      QcLock.getLock()
    })

    const qclock7 = schedule.scheduleJob('1 0 21 * * *', function () {
      QcLock.getLock()
    })
  },
}
