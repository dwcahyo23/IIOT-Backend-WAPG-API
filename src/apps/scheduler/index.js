import schedule from 'node-schedule'

import PRPo from '../PR-Po'
import QcLock from '../Qc-Lock'
import Ews from '../Ews'
import { format } from 'date-fns'
import workOrder from '../maintenance/workOrder'

export default {
  async getScheduler() {
    //! Job Scheduler Reguler
    const regulerJob = schedule.scheduleJob('1 * * * * *', function () {
      // !update from user
      workOrder
        .getOpen()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      workOrder
        .getClose()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })

    const getSprarepart1 = schedule.scheduleJob('1 0 8 * * 1-5', function () {
      workOrder
        .getSparepartBreakdownGM1()
        .then(() => workOrder.getSparepartBreakdownGM2())
        .catch((err) => console.log(err))
    })

    // const getSprarepart2 = schedule.scheduleJob('1 0 12 * * 1-5', function () {
    //   workOrder
    //     .getSparepartBreakdownGM1()
    //     .then(() => workOrder.getSparepartBreakdownGM2())
    //     .catch((err) => console.log(err))
    // })

    // const getSprarepart3 = schedule.scheduleJob('1 0 16 * * 1-5', function () {
    //   workOrder
    //     .getSparepartBreakdownGM1()
    //     .then(() => workOrder.getSparepartBreakdownGM2())
    //     .catch((err) => console.log(err))
    // })

    // const getSprarepart3 = schedule.scheduleJob('1 0 13 * * *', function () {
    //   workOrder
    //     .getSparepartBreakdownGM1()
    //     .then(() => workOrder.getSparepartBreakdownGM2())
    //     .catch((err) => console.log(err))
    // })

    // //! Job Scheduler EWS 2H
    const ews1 = schedule.scheduleJob('1 0 8 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))
    })

    const ews2 = schedule.scheduleJob('1 0 10 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))
    })

    const ews3 = schedule.scheduleJob('1 0 13 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))
    })

    const ews4 = schedule.scheduleJob('1 0 15 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))
    })

    const ews5 = schedule.scheduleJob('1 0 17 * * *', function () {
      Ews.getCritical().then((res) => console.log(res))
    })
  },
}
