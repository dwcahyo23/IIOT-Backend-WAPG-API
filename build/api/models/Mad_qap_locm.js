"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mad_qap_locm = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var Mad_qap_locm = _db["default"].define('mad_qap_locm', {
  ymd: DataTypes.DATE(6),
  unit_id: DataTypes.TEXT,
  sheet_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  bat_card: DataTypes.TEXT,
  ori_bat_card: DataTypes.TEXT,
  draw_no: DataTypes.TEXT,
  pdc_code: DataTypes.TEXT,
  fin_no: DataTypes.TEXT,
  memo_m: DataTypes.TEXT,
  verify_by: DataTypes.TEXT,
  verify_date: DataTypes.DATE(6),
  verify_mk: DataTypes.TEXT,
  modi_user: DataTypes.TEXT,
  modi_time: DataTypes.DATE(6),
  appe_user: DataTypes.TEXT,
  appe_time: DataTypes.DATE(6),
  pak_date: DataTypes.DATE(6),
  cst_no: DataTypes.TEXT,
  part_no: DataTypes.TEXT,
  made_by: DataTypes.TEXT,
  made_date: DataTypes.DATE(6),
  appr_by: DataTypes.TEXT,
  appr_date: DataTypes.DATE(6),
  problem: DataTypes.TEXT,
  pak_out_no: DataTypes.TEXT,
  check_no: DataTypes.TEXT,
  check_type: DataTypes.TEXT,
  standard: DataTypes.TEXT,
  result: DataTypes.TEXT,
  itlk_no: DataTypes.TEXT,
  check_kind: DataTypes.TEXT,
  trg_srt_qty: DataTypes.TEXT,
  sts_wa: DataTypes.CHAR(1),
  bat_card_2: DataTypes.TEXT,
  stk_no_2: DataTypes.TEXT
}, {
  freezeTableName: true,
  timestamps: false
});
exports.Mad_qap_locm = Mad_qap_locm;