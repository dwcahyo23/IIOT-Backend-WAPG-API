import { Sequelize } from 'sequelize'
import my from '../config/my'

const { DataTypes } = Sequelize

export const MaintenanceRequest = my.define('MaintenanceRequest', {
  uuid_request: {
    type: DataTypes.STRING(8),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sheet_no: DataTypes.STRING,
  mch_code: DataTypes.STRING(8),
  mch_com: DataTypes.STRING(8),
  date_request: DataTypes.DATE,
  category_request: DataTypes.STRING,
  slug: DataTypes.STRING(10),
  user_req1: DataTypes.STRING,
  user_req2: DataTypes.STRING,
  item_name: DataTypes.STRING,
  item_stock: DataTypes.STRING,
  item_qty: DataTypes.INTEGER,
  item_uom: DataTypes.STRING(10),
  item_ready: DataTypes.STRING,
  audit_request: DataTypes.STRING(8),
  date_audit_request: DataTypes.DATE,
  mre_request: DataTypes.STRING,
  sts_wa1: DataTypes.STRING,
  sts_wa2: DataTypes.STRING,
  sts_wa3: DataTypes.STRING,
})

export const AuthData = my.define(
  '_authData',
  {
    displayName: {
      type: DataTypes.STRING(100),
    },
    photoURL: {
      type: DataTypes.STRING,
    },
    userNIK: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    userNumber: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(100),
    },
    settings: {
      type: DataTypes.JSON,
      get() {
        const rawValue = this.getDataValue('settings')
        return JSON.parse(rawValue)
      },
    },
    shortcuts: {
      type: DataTypes.JSON,
      get: function () {
        if (typeof this.getDataValue('shortcuts') == 'string') {
          return JSON.parse(this.getDataValue('shortcuts'))
        } else {
          return this.getDataValue('shortcuts')
        }
        // console.log(typeof this.getDataValue('data_result'))
      },
    },
  },
  { timestamps: false },
)
