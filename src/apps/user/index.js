import { Op, Sequelize } from 'sequelize'
import { Sys_pro_mast } from '../../api/models/Sys_pro_mast'
import { Bas_man_mast } from '../../api/models/Bas_man_mast'

Bas_man_mast.hasMany(Sys_pro_mast, {
  foreignKey: 'man_no',
})
Sys_pro_mast.belongsTo(Bas_man_mast, {
  foreignKey: 'man_no',
})

export default {
  async getUser(params) {
    const { nik_pro } = params
    try {
      const User = await Sys_pro_mast.findAll({
        where: { nik_pro },
        include: Bas_man_mast,
      })
      return JSON.stringify(User, null, 2)
    } catch (err) {
      return err
    }
  },
}
