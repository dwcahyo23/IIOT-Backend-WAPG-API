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
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var error, User, Wo, upStsWa, sendMsg;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context4.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', (0, _dateFns.format)(new Date(), 'yyyy-MM-dd')), {
                sts_wa: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'N')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context4.sent;
            upStsWa = /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _MntnWoModel.MntnWoModel.update({
                        sts_wa: 'Y'
                      }, {
                        where: {
                          sheet_no: params.id
                        }
                      });
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function upStsWa(_x) {
                return _ref.apply(this, arguments);
              };
            }();
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
            sendMsg = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return (0, _axios["default"])({
                        method: 'post',
                        url: 'http://192.168.192.7:5010/send-message',
                        data: {
                          number: params.number,
                          message: params.msg
                        }
                      });
                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function sendMsg(_x2) {
                return _ref2.apply(this, arguments);
              };
            }();
            if (!(error.length === 0)) {
              _context4.next = 12;
              break;
            }
            _lodash["default"].forEach(Wo, /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(record) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _lodash["default"].forEach(User, function (field) {
                        if (_lodash["default"].includes(field.plant, record.com_no) && _lodash["default"].includes(field.dep_no, record.dep_no)) {
                          var msg = "*Sheet_no:* ".concat(record.sheet_no, " (Open)\u274C");
                          msg += "\n\nGood day! ".concat(field.gender, " ").concat(field.name, ", berikut info Wo open saat ini:");
                          msg += "\n\n*Stoptime:* ".concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\n*Machine:* ").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n*Priority:* ").concat(record.pri_no == '01' ? 'Breakdown time' : record.pri_no == '02' ? 'Mesin tetap beroperasi' : record.pri_no == '03' ? 'Prev & Pred' : 'Workshop', "\n*Problem:* ").concat(record.s_memo, "\n*Remarks:* ").concat(record.memo, "\n*Reason:* ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain', " ");
                          sendMsg({
                            number: field.number,
                            msg: msg
                          });
                          upStsWa({
                            id: record.sheet_no
                          });
                          // console.log(JSON.stringify(User))
                        }
                      });
                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());
            return _context4.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 12:
            return _context4.abrupt("return", error);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getClose: function getClose() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var error, User, Wo, upStsWa, sendMsg;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            //! minta perubahan / tambahan field pada postgree ketika sudah kirim wo closed
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context9.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-03-08'), {
                chk_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y'),
                sts_wa2: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'n')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context9.sent;
            upStsWa = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(params) {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _MntnWoModel.MntnWoModel.update({
                        sts_wa2: 'Y'
                      }, {
                        where: {
                          sheet_no: params.id
                        }
                      });
                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              return function upStsWa(_x4) {
                return _ref4.apply(this, arguments);
              };
            }();
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
            sendMsg = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(params) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return (0, _axios["default"])({
                        method: 'post',
                        url: 'http://192.168.192.7:5010/send-message',
                        data: {
                          number: params.number,
                          message: params.msg
                        }
                      });
                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function sendMsg(_x5) {
                return _ref5.apply(this, arguments);
              };
            }();
            if (!(error.length === 0)) {
              _context9.next = 12;
              break;
            }
            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(field) {
                var msg;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      msg = "Good day! ".concat(field.gender, " ").concat(field.name, "\n");
                      msg += "\nBerikut info Wo close saat ini:";
                      _lodash["default"].forEach(Wo, /*#__PURE__*/function () {
                        var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(record, i) {
                          return _regenerator["default"].wrap(function _callee7$(_context7) {
                            while (1) switch (_context7.prev = _context7.next) {
                              case 0:
                                if (_lodash["default"].includes(field.plant, record.com_no) && _lodash["default"].includes(field.dep_no, record.dep_no)) {
                                  msg += "\n".concat(i + 1, ". Sheet: ").concat(record.sheet_no, " (Closed) \u2705\nStoptime: ").concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\nMachine: ").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n*Priority:* ").concat(record.pri_no == '01' ? 'Breakdown time' : record.pri_no == '02' ? 'Mesin tetap beroperasi' : record.pri_no == '03' ? 'Prev & Pred' : 'Workshop', "\nProblem: ").concat(record.s_memo, "\nRemarks: ").concat(record.memo, "\nReason: ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain').concat(Wo.length - 1 == i ? '\n' : '\n-----------------------------------------------------------------');
                                }
                                upStsWa({
                                  id: record.sheet_no
                                });
                              case 2:
                              case "end":
                                return _context7.stop();
                            }
                          }, _callee7);
                        }));
                        return function (_x7, _x8) {
                          return _ref7.apply(this, arguments);
                        };
                      }());
                      msg += "\nThank you and have a nice day! \uD83D\uDE0A";
                      sendMsg({
                        number: field.number,
                        msg: msg
                      });
                    case 5:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }());
            return _context9.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 12:
            return _context9.abrupt("return", error);
          case 13:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))();
  }
};
exports["default"] = _default;