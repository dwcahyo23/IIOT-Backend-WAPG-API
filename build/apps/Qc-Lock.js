"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../api/config/db"));
var _sequelize = require("sequelize");
var _Mad_qap_locm = require("../api/models/Mad_qap_locm");
var _config = _interopRequireDefault(require("config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireDefault(require("axios"));
var _dateFns = require("date-fns");
var _default = {
  getLock: function getLock(params) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var error, User, Lock;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'qc');
            });
            _context3.next = 4;
            return _db["default"].query("SELECT \n      sch_ot.mad_qap_locm.*, \n      sch_ot.bas_pdc_mast.pdc_name \n    FROM \n      sch_ot.mad_qap_locm \n      join sch_ot.bas_pdc_mast on sch_ot.mad_qap_locm.pdc_code = sch_ot.bas_pdc_mast.pdc_code \n    where \n      date(sch_ot.mad_qap_locm.ymd) = CURRENT_DATE \n      and sts_wa = 'N' \n    order by \n      sch_ot.mad_qap_locm.ymd asc", {
              type: _sequelize.QueryTypes.SELECT
            });
          case 4:
            Lock = _context3.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User not found'
              });
            }
            if (Lock.length < 1) {
              error.push({
                type: 'error',
                message: 'Data mntn-wo open not found'
              });
            }
            if (!(error.length === 0)) {
              _context3.next = 10;
              break;
            }
            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(field) {
                var msg;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      msg = "*Good day! ".concat(field.gender, " ").concat(field.name, "*\n");
                      msg += "\nBerikut info QC-Lock saat ini:\n\n-----------------------------------------------------------------";
                      _lodash["default"].forEach(Lock, /*#__PURE__*/function () {
                        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(record, i) {
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                              case 0:
                                msg += "\n*".concat(i + 1, ". Sheet_no:* ").concat(record.sheet_no, "\nProduct: ").concat(record.pdc_name, "\nTravel Card: ").concat(record.bat_card, "\nFragment: ").concat(record.bat_card_2, " | ").concat(record.stk_no_2, "\n\nProblem: ").concat(record.problem, "\nStandard: ").concat(record.standard, "\nResult: ").concat(record.result, "\n-----------------------------------------------------------------");
                                _context.next = 3;
                                return _Mad_qap_locm.Mad_qap_locm.update({
                                  sts_wa: 'Y'
                                }, {
                                  where: {
                                    sheet_no: record.sheet_no
                                  }
                                });
                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }, _callee);
                        }));
                        return function (_x2, _x3) {
                          return _ref2.apply(this, arguments);
                        };
                      }());
                      msg += "\n\nThank you and have a nice day! \uD83D\uDE0A";
                      _context2.next = 6;
                      return (0, _axios["default"])({
                        method: 'post',
                        url: 'http://localhost:5010/send-message',
                        data: {
                          number: field.number,
                          message: msg
                        }
                      });
                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
            return _context3.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 10:
            return _context3.abrupt("return", error);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  }
};
exports["default"] = _default;