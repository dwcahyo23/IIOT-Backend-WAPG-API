import { Sequelize } from 'sequelize'
import db from '../config/db'
const { DataTypes } = Sequelize

export const Sys_pro_mast = db.define(
  'sys_pro_mast',
  {
    nik_pro: { type: DataTypes.TEXT, primaryKey: true },
    nm_pro: DataTypes.TEXT,
    man_no: { type: DataTypes.TEXT, primaryKey: true },
    set_no: DataTypes.JSON,
  },
  { freezeTableName: true, timestamps: false },
)
