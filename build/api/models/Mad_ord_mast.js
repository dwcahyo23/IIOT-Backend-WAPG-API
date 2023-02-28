"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mad_ord_mast = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../config/db"));
var DataTypes = _sequelize.Sequelize.DataTypes;
var Mad_ord_mast = _db["default"].define('mad_ord_mast', {
  ymd: DataTypes.DATE(6),
  sheet_no: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  pur_sheet_no: DataTypes.TEXT,
  ven_no: DataTypes.TEXT,
  man_no: DataTypes.TEXT,
  dep_no: DataTypes.TEXT,
  pay_type: DataTypes.TEXT,
  pay_time: DataTypes.TEXT,
  mny_no: DataTypes.TEXT,
  tax_rate: DataTypes.INTEGER,
  tax_type: DataTypes.TEXT,
  imp_mk: DataTypes.CHAR(1),
  inv_type: DataTypes.TEXT,
  memo_m: DataTypes.TEXT,
  in_memo: DataTypes.TEXT,
  chk_man: DataTypes.TEXT,
  chk_date: DataTypes.DATE(6),
  chk_mark: DataTypes.CHAR(1),
  modi_user: DataTypes.TEXT,
  modi_time: DataTypes.DATE(6),
  appe_user: DataTypes.TEXT,
  appe_time: DataTypes.DATE(6),
  memo: DataTypes.TEXT,
  linkman: DataTypes.TEXT,
  check_man: DataTypes.TEXT,
  pph_rate: DataTypes.INTEGER,
  price_term: DataTypes.TEXT,
  print_qty: DataTypes.INTEGER,
  com_no: DataTypes.TEXT,
  contract_no: DataTypes.TEXT,
  dlv_to: DataTypes.TEXT,
  dlv_add: DataTypes.TEXT,
  pay_mny: DataTypes.TEXT,
  rev_count: DataTypes.INTEGER,
  check_date: DataTypes.DATE(6),
  check_mark: DataTypes.TEXT,
  print_mk: DataTypes.TEXT,
  pdf_mk: DataTypes.TEXT,
  mes_mk: DataTypes.TEXT,
  amt: DataTypes.INTEGER
}, {
  freezeTableName: true,
  timestamps: false
});
exports.Mad_ord_mast = Mad_ord_mast;