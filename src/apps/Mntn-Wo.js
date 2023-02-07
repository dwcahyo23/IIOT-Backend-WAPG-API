import { Op, Sequelize } from 'sequelize'
import { MntnWoModel } from '../api/models/Mntn-WoModel'
import config from 'config'
import _ from 'lodash'
import axios from 'axios'

export default {
  async getUpdate() {
    const error = []
    const User = _.filter(config.get('ConfigUsers.UserList'), (el) =>
      _.includes(el.set, 'mn'),
    )

    if (User.length < 1) {
      error.push({
        type: 'error',
        message: 'User not found',
      })
    }

    if (error.length === 0) {
      const wo = await MntnWoModel.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('date', Sequelize.col('ymd')),
              '>',
              '2023-02-01',
            ),
            {
              sts_wa: {
                [Op.eq]: 'N',
              },
            },
          ],
        },
      })

      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5010/send-message',
      //   data: {
      //     number: '082113450491',
      //     message: 'tes',
      //   },
      // })

      function data(number, msg) {
        return {
          number,
          message: msg,
        }
      }

      return axios({
        method: 'post',
        url: 'http://localhost:5010/send-message',
        data: _.map(User, (el) => data(el.number, 'tes')),
      })
    }

    return error
  },
}
