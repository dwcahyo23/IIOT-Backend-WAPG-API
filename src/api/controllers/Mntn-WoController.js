import { Op } from 'sequelize'
import { MntnWoModel } from '../models/Mntn-WoModel'

export default {
  async getWo(req, res) {
    try {
      const wo = await MntnWoModel.findOne({
        where: {
          sheet_no: 'AP-23020047',
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
