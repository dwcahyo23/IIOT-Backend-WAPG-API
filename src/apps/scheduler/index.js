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
      // QcLock.getLock().then((res) => console.log(res))
    })

    // //! Job Scheduler EWS 2H
    // const ews1 = schedule.scheduleJob('1 0 8 * * *', function () {
    //   Ews.getCritical().then((res) => console.log(res))
    // })

    // const ews2 = schedule.scheduleJob('1 0 10 * * *', function () {
    //   Ews.getCritical().then((res) => console.log(res))
    // })

    // const ews3 = schedule.scheduleJob('1 0 13 * * *', function () {
    //   Ews.getCritical().then((res) => console.log(res))
    // })

    // const ews4 = schedule.scheduleJob('1 0 15 * * *', function () {
    //   Ews.getCritical().then((res) => console.log(res))
    // })

    // const ews5 = schedule.scheduleJob('1 0 17 * * *', function () {
    //   Ews.getCritical().then((res) => console.log(res))
    // })

    //! Job Scheduler PR
    // const jobPPUMorning = schedule.scheduleJob('1 0 8 * * 1-5', function () {
    //   PRPo.getPPU({ isTime: 'morning' }).then((res) => console.log(res))
    //   console.log(
    //     'jobPPU has been injected at ' +
    //       format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
    //   )
    // })

    // const jobPPUEvening = schedule.scheduleJob('1 0 13 * * 1-5', function () {
    //   PRPo.getPPU({ isTime: 'evening' }).then((res) => console.log(res))
    //   console.log(
    //     'jobPPU has been injected at ' +
    //       format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
    //   )
    // })
  },
}
