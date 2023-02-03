"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MntnWoModel = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var MntnWoModel = _db["default"].define('mow_mtn_appm', {
  ymd: DataTypes.DATE(6),
  unit_id: DataTypes.TEXT,
  sheet_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  man_no: DataTypes.TEXT,
  com_no: DataTypes.TEXT,
  dep_no: DataTypes.TEXT,
  mch_no: DataTypes.TEXT,
  stk_no: DataTypes.TEXT,
  pri_no: DataTypes.TEXT,
  shf_no: DataTypes.TEXT,
  rsn_no: DataTypes.TEXT,
  s_ymd: DataTypes.DATE(6),
  s_memo: DataTypes.TEXT,
  m_ymd: DataTypes.DATE(6),
  m_man_no: DataTypes.TEXT,
  m_sheet_no: DataTypes.TEXT,
  mk: DataTypes.CHAR(1),
  memo: DataTypes.TEXT,
  chk_mark: DataTypes.CHAR(1),
  chk_man: DataTypes.TEXT,
  chk_date: DataTypes.DATE(6),
  modi_user: DataTypes.TEXT,
  modi_time: DataTypes.DATE(6),
  appe_user: DataTypes.TEXT,
  appe_time: DataTypes.DATE(6),
  sts_wa: DataTypes.CHAR(1)
}, {
  freezeTableName: true,
  timestamps: false
});
exports.MntnWoModel = MntnWoModel;