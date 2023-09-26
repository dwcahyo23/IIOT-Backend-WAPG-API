"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ews = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var Ews = _db["default"].define('_ews', {
  cst_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  part_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  qty_order: DataTypes.INTEGER,
  wdo_qty: DataTypes.INTEGER,
  delay_qty: DataTypes.INTEGER,
  fg_qty: DataTypes.INTEGER,
  trs_qty: DataTypes.INTEGER,
  pk_qty: DataTypes.INTEGER,
  wip3_qty: DataTypes.INTEGER,
  wip_qty: DataTypes.INTEGER,
  asrs_qty: DataTypes.INTEGER,
  subcon_qty: DataTypes.INTEGER,
  part_name: DataTypes.TEXT
}, {
  freezeTableName: true,
  timestamps: false
});
exports.Ews = Ews;