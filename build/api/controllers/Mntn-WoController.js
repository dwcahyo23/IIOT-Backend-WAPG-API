"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _MntnWoModel = require("../models/Mntn-WoModel");
var _Sys_pro_mast = require("../models/Sys_pro_mast");
var _Bas_man_mast = require("../models/Bas_man_mast");
_Bas_man_mast.Bas_man_mast.hasMany(_Sys_pro_mast.Sys_pro_mast, {
  foreignKey: 'man_no'
});
_Sys_pro_mast.Sys_pro_mast.belongsTo(_Bas_man_mast.Bas_man_mast, {
  foreignKey: 'man_no'
});
var _default = {
  getWo: function getWo(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var wo;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>', '2023-02-01'), {
                sts_wa: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'N')
              }])
            });
          case 3:
            wo = _context.sent;
            return _context.abrupt("return", res.status(201).json(wo));
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).send({
              message: 'Could not perform operation at this time, kindly try again later.'
            }));
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }))();
  },
  getUser: function getUser(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var nik_pro, User;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            //! raw query
            // SELECT sch_ot.sys_pro_mast.* , sch_ot.bas_man_mast.* FROM sch_ot.sys_pro_mast join sch_ot.bas_man_mast on sch_ot.sys_pro_mast.man_no = sch_ot.bas_man_mast.man_no
            // where  sch_ot.sys_pro_mast.nik_pro  = '55241d2b-dcc8-4502-88b9-ab12c7e140a3'
            nik_pro = req.body.nik_pro;
            _context2.prev = 1;
            _context2.next = 4;
            return _Sys_pro_mast.Sys_pro_mast.findAll({
              where: {
                nik_pro: nik_pro
              },
              include: _Bas_man_mast.Bas_man_mast
            });
          case 4:
            User = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(User));
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).send({
              message: 'Could not perform operation at this time, kindly try again later.'
            }));
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 8]]);
    }))();
  }
};
exports["default"] = _default;