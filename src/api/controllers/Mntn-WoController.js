import { Op, Sequelize } from 'sequelize'
import { MntnWoModel } from '../models/Mntn-WoModel'
import { Sys_pro_mast } from '../models/Sys_pro_mast'
import { Bas_man_mast } from '../models/Bas_man_mast'

Bas_man_mast.hasMany(Sys_pro_mast, {
  foreignKey: 'man_no',
})
Sys_pro_mast.belongsTo(Bas_man_mast, {
  foreignKey: 'man_no',
})

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

  async getUser(req, res) {
    //! raw query
    // SELECT sch_ot.sys_pro_mast.* , sch_ot.bas_man_mast.* FROM sch_ot.sys_pro_mast join sch_ot.bas_man_mast on sch_ot.sys_pro_mast.man_no = sch_ot.bas_man_mast.man_no
    // where  sch_ot.sys_pro_mast.nik_pro  = '55241d2b-dcc8-4502-88b9-ab12c7e140a3'

    const { nik_pro } = req.body
    try {
      const User = await Sys_pro_mast.findAll({
        where: { nik_pro },
        include: Bas_man_mast,
      })
      return res.status(200).json(User)
    } catch (e) {
      console.log(e)
      return res.status(500).send({
        message:
          'Could not perform operation at this time, kindly try again later.',
      })
    }
  },
}
