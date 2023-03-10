import schedule from 'node-schedule'
import MnWo from '../Mn-Wo'
import PRPo from '../PR-Po'
import QcLock from '../Qc-Lock'
import { format } from 'date-fns'
import user from '../user'

export default {
  async getScheduler() {
    //! Job Scheduler Reguler
    const regulerJob = schedule.scheduleJob('1 * * * * *', function () {
      // !update from user
      // user
      //   .getUser({ nik_pro: '55241d2b-dcc8-4502-88b9-ab12c7e140a3' })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err))

      MnWo.getOpen().then((res) => console.log(res))
      MnWo.getClose().then((res) => console.log(res))
      QcLock.getLock().then((res) => console.log(res))

      //! Debug Test
      // PRPo.getPPU({ isTime: 'morning' }).then((res) => console.log(res))
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
