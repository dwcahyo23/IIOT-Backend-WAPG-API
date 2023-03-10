"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sys_pro_mast = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var Sys_pro_mast = _db["default"].define('sys_pro_mast', {
  nik_pro: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  nm_pro: DataTypes.TEXT,
  man_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  set_no: DataTypes.JSON
}, {
  freezeTableName: true,
  timestamps: false
});
exports.Sys_pro_mast = Sys_pro_mast;