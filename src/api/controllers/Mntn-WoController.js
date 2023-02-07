import { Op, Sequelize } from 'sequelize'
import { MntnWoModel } from '../models/Mntn-WoModel'

export default {
  async getWo(req, res) {
    try {
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
      return res.status(201).json(wo)
    } catch (e) {
      console.log(e)
      return res.status(500).send({
        message:
          'Could not perform operation at this time, kindly try again later.',
      })
    }
  },
}
