import { Sequelize } from 'sequelize'
import db from '../config/db'
const { DataTypes } = Sequelize

export const Bas_man_mast = db.define(
  'bas_man_mast',
  {
    man_no: { type: DataTypes.STRING, primaryKey: true },
    man_name: DataTypes.TEXT,
    modi_user: DataTypes.CHAR(10),
    modi_time: DataTypes.DATE(6),
    appe_user: DataTypes.CHAR(10),
    appe_time: DataTypes.DATE(6),
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    pln_no: DataTypes.STRING,
  },
  { freezeTableName: true, timestamps: false },
)
