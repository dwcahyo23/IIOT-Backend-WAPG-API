"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _MntnWoModel = require("../models/Mntn-WoModel");
var _default = {
  getWo: function getWo(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var wo;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _MntnWoModel.MntnWoModel.findOne({
              where: {
                sheet_no: 'AP-23020047'
              }
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
  }
};
exports["default"] = _default;