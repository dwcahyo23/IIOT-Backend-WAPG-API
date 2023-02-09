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
var _MntnWoModel = require("../api/models/Mntn-WoModel");
var _config = _interopRequireDefault(require("config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireDefault(require("axios"));
var _dateFns = require("date-fns");
var _default = {
  getOpen: function getOpen() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, User, Wo;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context2.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-02-08'), {
                sts_wa: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'N')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context2.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User not found'
              });
            }
            if (Wo.length < 1) {
              error.push({
                type: 'error',
                message: 'Data mntn-wo open not found'
              });
            }
            if (!(error.length === 0)) {
              _context2.next = 10;
              break;
            }
            _lodash["default"].forEach(User, function (field) {
              _lodash["default"].forEach(Wo, /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(record) {
                  var msg;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        msg = '*_Work Order by Erp_ (Open)❌*\n';
                        _context.next = 3;
                        return (0, _axios["default"])({
                          method: 'post',
                          url: 'http://localhost:5010/send-message',
                          data: {
                            number: field.number,
                            message: msg += "\n*Sheet_no:* ".concat(record.sheet_no, "\n*Stoptime:* ").concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\n").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n------------------------------------------\n              \n*Problem:* ").concat(record.s_memo, "\n*Remarks:* ").concat(record.memo, "\n*Reason:* ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain', " ")
                          }
                        });
                      case 3:
                        _context.next = 5;
                        return _MntnWoModel.MntnWoModel.update({
                          sts_wa: 'Y'
                        }, {
                          where: {
                            sheet_no: record.sheet_no
                          }
                        });
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
            });
            return _context2.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 10:
            return _context2.abrupt("return", error);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getClose: function getClose() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var error, User, Wo;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context4.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-02-08'), {
                chk_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context4.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User not found'
              });
            }
            if (Wo.length < 1) {
              error.push({
                type: 'error',
                message: 'Data mntn-wo closed not found'
              });
            }
            if (!(error.length === 0)) {
              _context4.next = 10;
              break;
            }
            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(field) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _lodash["default"].forEach(Wo, function (record) {
                        var msg = '*_Work Order by Erp_ (Closed) ✅*\n';
                        (0, _axios["default"])({
                          method: 'post',
                          url: 'http://localhost:5010/send-message',
                          data: {
                            number: field.number,
                            message: msg += "\n*Sheet_no:* ".concat(record.sheet_no, "\n*Stoptime:* ").concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\n").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n------------------------------------------\n              \n*Problem:* ").concat(record.s_memo, "\n*Remarks:* ").concat(record.memo, "\n*Reason:* ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain', " ")
                          }
                        });
                      });
                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            return _context4.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 10:
            return _context4.abrupt("return", error);
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  }
};
exports["default"] = _default;