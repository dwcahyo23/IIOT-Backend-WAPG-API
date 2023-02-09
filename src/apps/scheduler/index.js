import schedule from 'node-schedule'
import MnWo from '../Mn-Wo'
import PRPo from '../PR-Po'
import { format } from 'date-fns'

export default {
  async getScheduler() {
    //! Job Scheduler Reguler
    const regulerJob = schedule.scheduleJob('1 * * * * *', function () {
      // MnWo.getOpen().then((res) => console.log(res))
      // MnWo.getClose().then((res) => console.log(res))
      PRPo.getPPU({ isTime: 'morning' }).then((res) => console.log(res))
      console.log(
        'regulerJob has been injected at ' +
          format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
      )
    })

    //! Job Scheduler Custom
    const jobPPUMorning = schedule.scheduleJob('1 0 8 * * 1-5', function () {
      PRPo.getPPU({ isTime: 'morning' }).then((res) => console.log(res))
      console.log(
        'jobPPU has been injected at ' +
          format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
      )
    })

    const jobPPUEvening = schedule.scheduleJob('1 0 13 * * 1-5', function () {
      PRPo.getPPU({ isTime: 'evening' }).then((res) => console.log(res))
      console.log(
        'jobPPU has been injected at ' +
          format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
      )
    })
  },
}
