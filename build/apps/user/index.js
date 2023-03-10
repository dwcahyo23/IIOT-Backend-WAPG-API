"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _Sys_pro_mast = require("../../api/models/Sys_pro_mast");
var _Bas_man_mast = require("../../api/models/Bas_man_mast");
_Bas_man_mast.Bas_man_mast.hasMany(_Sys_pro_mast.Sys_pro_mast, {
  foreignKey: 'man_no'
});
_Sys_pro_mast.Sys_pro_mast.belongsTo(_Bas_man_mast.Bas_man_mast, {
  foreignKey: 'man_no'
});
var _default = {
  getUser: function getUser(params) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var nik_pro, User;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            nik_pro = params.nik_pro;
            _context.prev = 1;
            _context.next = 4;
            return _Sys_pro_mast.Sys_pro_mast.findAll({
              where: {
                nik_pro: nik_pro
              },
              include: _Bas_man_mast.Bas_man_mast
            });
          case 4:
            User = _context.sent;
            return _context.abrupt("return", JSON.stringify(User, null, 2));
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 8]]);
    }))();
  }
};
exports["default"] = _default;