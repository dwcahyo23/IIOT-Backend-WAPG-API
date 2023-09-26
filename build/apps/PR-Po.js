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
var _Mad_ord_mast = require("../api/models/Mad_ord_mast");
var _Bas_man_mast = require("../api/models/Bas_man_mast");
var _config = _interopRequireDefault(require("config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireDefault(require("axios"));
var _default = {
  getPPU: function getPPU(params) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, User, Pu, sendMsg;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            error = [];
            User = _lodash["default"].filter(_config["default"].get('ConfigUsers.UserList'), function (el) {
              return _lodash["default"].includes(el.set, 'pr');
            });
            _context2.next = 4;
            return _Mad_ord_mast.Mad_ord_mast.findAll({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>=', '2023-02-01'), {
                check_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'N'),
                chk_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y')
              }]),
              order: [['sheet_no', 'ASC']]
            });
          case 4:
            Pu = _context2.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User pr not found'
              });
            }
            if (Pu.length < 1) {
              error.push({
                type: 'error',
                message: 'Data mad_ord_mast not found'
              });
            }
            sendMsg = /*#__PURE__*/function () {
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
            if (!(error.length === 0)) {
              _context2.next = 11;
              break;
            }
            _lodash["default"].forEach(User, function (field) {
              _lodash["default"].forEach(Pu, function (record, i) {
                if (_lodash["default"].includes(field.nik, record.check_man)) {
                  var message = "*Hello  ".concat(field.gender, ". ").concat(field.name, "* \n\n");
                  if (params.isTime == 'morning') {
                    message += "Semangat Pagi!\n            \nBerikut PO Outstanding yang perlu diaudit:\n";
                  } else {
                    message += "Walau sudah siang, kita harus tetap semangat!\n            \nBerikut ini ada tambahan PO Outstanding yang perlu diaudit:\n";
                  }
                  _lodash["default"].forEach(Pu, function (record, i) {
                    if (_lodash["default"].includes(field.nik, record.check_man)) {
                      message += "\n".concat(i + 1, ". ").concat(record.sheet_no, " \u2502 ").concat(record.mny_no, " ").concat((record.amt * 1).toLocaleString());
                    }
                  });
                  message += "\n\nMohon dilakukan verifikasinya ya ".concat(field.gender, ". ").concat(field.name, ",\napabila ada pertanyaan lebih lanjut bisa menghubungi tim purchasing secara langsung.\n          \nThank you and have a nice day! \uD83D\uDE0A");
                  sendMsg({
                    number: field.number,
                    msg: message
                  });
                }
              });
            });
            return _context2.abrupt("return", {
              type: 'succes',
              message: 'message PRPO sended successfully'
            });
          case 11:
            return _context2.abrupt("return", error);
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};
exports["default"] = _default;