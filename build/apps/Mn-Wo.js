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
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var error, User, Wo, sendMsg;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context3.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-02-10'), {
                sts_wa: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context3.sent;
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
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _axios["default"])({
                        method: 'post',
                        url: 'http://localhost:5010/send-message',
                        data: {
                          number: params.number,
                          message: params.msg
                        }
                      });
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function sendMsg(_x) {
                return _ref.apply(this, arguments);
              };
            }();
            if (!(error.length === 0)) {
              _context3.next = 11;
              break;
            }
            _lodash["default"].forEach(Wo, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(record) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _lodash["default"].forEach(User, function (field) {
                        if (_lodash["default"].includes(field.plant, record.com_no)) {
                          var msg = "Good day! ".concat(field.gender, " ").concat(field.name, "\n");
                          msg += "\nBerikut info Wo-Open saat ini:\n------------------------------------------------------------------";
                          msg += "\nSheet_no: ".concat(record.sheet_no, " (Open)\u274C\n\nStoptime: ").concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\n\nMachine: ").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n\nProblem: ").concat(record.s_memo, "\n\nRemarks: ").concat(record.memo, "\n\nReason: ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain', " ");
                          sendMsg({
                            number: field.number,
                            msg: msg
                          });
                        }
                      });
                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            return _context3.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 11:
            return _context3.abrupt("return", error);
          case 12:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getClose: function getClose() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var error, User, Wo, sendMsg;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            //! minta perubahan / tambahan field pada postgree ketika sudah kirim wo closed
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'mn');
            });
            _context7.next = 4;
            return _MntnWoModel.MntnWoModel.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-02-09'), {
                chk_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Wo = _context7.sent;
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
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(params) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return (0, _axios["default"])({
                        method: 'post',
                        url: 'http://localhost:5010/send-message',
                        data: {
                          number: params.number,
                          message: params.msg
                        }
                      });
                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function sendMsg(_x3) {
                return _ref3.apply(this, arguments);
              };
            }();
            if (!(error.length === 0)) {
              _context7.next = 11;
              break;
            }
            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(field) {
                var msg;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      msg = "Good day! ".concat(field.gender, " ").concat(field.name, "\n");
                      msg += "\nBerikut info Wo-Close saat ini:\n\n-----------------------------------------------------------------";
                      _lodash["default"].forEach(Wo, /*#__PURE__*/function () {
                        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(record, i) {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) switch (_context5.prev = _context5.next) {
                              case 0:
                                if (_lodash["default"].includes(field.plant, record.com_no)) {
                                  msg += "\n".concat(i + 1, ". Sheet: ").concat(record.sheet_no, " (Closed) \u2705\n\nStoptime: ").concat((0, _dateFns.format)(new Date(record.ymd), 'dd MMM yyyy HH:mm'), "\n\nMachine: ").concat(record.mch_no, " | ").concat(record.dep_no, " | ").concat(record.com_no == '01' ? 'GM1' : record.com_no == '02' ? 'GM2' : record.com_no == '03' ? 'GM3' : 'GM5', "\n            \n\nProblem: ").concat(record.s_memo, "\n\nRemarks: ").concat(record.memo, "\\nnReason: ").concat(record.rsn_no == '00' ? 'Stoptime' : record.rsn_no == '01' ? 'Aus&Retak' : record.rsn_no == '02' ? 'Kecelakaan' : record.rsn_no == '03' ? 'Salah Operasi' : record.rsn_no == '04' ? 'Lalai' : 'Lain-lain', "\n----------------------------------------------------------------- ");
                                }
                              case 1:
                              case "end":
                                return _context5.stop();
                            }
                          }, _callee5);
                        }));
                        return function (_x5, _x6) {
                          return _ref5.apply(this, arguments);
                        };
                      }());
                      msg += "\n\nThank you and have a nice day! \uD83D\uDE0A";
                      sendMsg({
                        number: field.number,
                        msg: msg
                      });
                    case 5:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }());
            return _context7.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 11:
            return _context7.abrupt("return", error);
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  }
};
exports["default"] = _default;