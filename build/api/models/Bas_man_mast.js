"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bas_man_mast = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var Bas_man_mast = _db["default"].define('bas_man_mast', {
  man_no: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  man_name: DataTypes.TEXT,
  modi_user: DataTypes.CHAR(10),
  modi_time: DataTypes.DATE(6),
  appe_user: DataTypes.CHAR(10),
  appe_time: DataTypes.DATE(6),
  sex: DataTypes.STRING,
  phone: DataTypes.STRING,
  pln_no: DataTypes.STRING
}, {
  freezeTableName: true,
  timestamps: false
});
exports.Bas_man_mast = Bas_man_mast;