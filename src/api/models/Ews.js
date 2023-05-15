import { Sequelize } from 'sequelize'
import db from '../config/db'
const { DataTypes } = Sequelize

export const Ews = db.define(
  '_ews',
  {
    cst_no: { type: DataTypes.TEXT, primaryKey: true },
    part_no: { type: DataTypes.TEXT, primaryKey: true },
    qty_order: DataTypes.INTEGER,
    wdo_qty: DataTypes.INTEGER,
    delay_qty: DataTypes.INTEGER,
    fg_qty: DataTypes.INTEGER,
    trs_qty: DataTypes.INTEGER,
    pk_qty: DataTypes.INTEGER,
    wip3_qty: DataTypes.INTEGER,
    wip_qty: DataTypes.INTEGER,
    asrs_qty: DataTypes.INTEGER,
    part_name: DataTypes.TEXT,
  },
  { freezeTableName: true, timestamps: false },
)
