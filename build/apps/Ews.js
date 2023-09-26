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
var _Ews = require("../api/models/Ews");
var _config = _interopRequireDefault(require("config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireDefault(require("axios"));
var _dateFns = require("date-fns");
var sendMsg = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(params.type == 'group')) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return _axios["default"].post('http://192.168.192.7:5010/send-message-group', {
            name: params.name,
            message: params.msg
          }).then(function (res) {
            return console.log(res.status);
          })["catch"](function (e) {
            return console.log(e.message);
          });
        case 3:
          _context.next = 7;
          break;
        case 5:
          _context.next = 7;
          return _axios["default"].post('http://192.168.192.7:5010/send-message', {
            number: params.number,
            message: params.msg
          }).then(function (res) {
            return console.log(res.status);
          })["catch"](function (e) {
            return console.log(e.message);
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendMsg(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = {
  getCritical: function getCritical() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var error, User, ews;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'ews');
            });
            _context4.next = 4;
            return _Ews.Ews.findAll({
              where: {
                subcon_qty: (0, _defineProperty2["default"])({}, _sequelize.Op.lt, 0)
              }
            });
          case 4:
            ews = _context4.sent;
            if (User.length < 1) {
              error.push({
                message: 'User ews not found'
              });
            }
            if (ews.length < 1) {
              error.push({
                message: 'Data ews not found'
              });
            }
            if (!(error.length === 0)) {
              _context4.next = 10;
              break;
            }
            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(field) {
                var msg;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      msg = "*Hello ".concat(field.gender, " ").concat(field.name, "*\n");
                      msg += "\nThis is critical info from EWS:\n\n";
                      _lodash["default"].forEach(ews, /*#__PURE__*/function () {
                        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(record, i) {
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) switch (_context2.prev = _context2.next) {
                              case 0:
                                msg += "\n*".concat(i + 1, ".Customer: ").concat(record.cst_no, "* \nPart_no: ").concat(record.part_no, " \nPart_name: ").concat(record.part_name, " \nQty Order: ").concat((record.qty_order * 1).toLocaleString(), " \nQty Wdo: ").concat((record.wdo_qty * 1).toLocaleString(), " \nQty FG: ").concat((record.fg_qty * 1).toLocaleString(), " \nQty Transit: ").concat((record.trs_qty * 1).toLocaleString(), " \nQty PK: ").concat((record.pk_qty * 1).toLocaleString(), " \nQty Wip3: ").concat((record.wip3_qty * 1).toLocaleString(), " \nQty Wip: ").concat((record.wip_qty * 1).toLocaleString(), " \nQty Asrs: ").concat((record.asrs_qty * 1).toLocaleString(), " \nQty Subcon: ").concat((record.subcon_qty * 1).toLocaleString()).concat(record.length - 1 == i ? '\n' : '\n--------------------------------------------');
                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                          }, _callee2);
                        }));
                        return function (_x3, _x4) {
                          return _ref3.apply(this, arguments);
                        };
                      }());
                      msg += "\nThank you!";
                      sendMsg({
                        number: field.number,
                        msg: msg
                      });
                    case 5:
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
              message: 'message EWS sended successfully'
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