"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _Mad_ord_mast = require("../api/models/Mad_ord_mast");
var _config = _interopRequireDefault(require("config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireWildcard(require("axios"));
var _table = require("table");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
                check_mark: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'N')
              }]),
              order: [['ymd', 'ASC']]
            });
          case 4:
            Pu = _context2.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User not found'
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
              _context2.next = 11;
              break;
            }
            _lodash["default"].forEach(User, function (field) {
              var message = "*Halo  ".concat(field.gender, ". ").concat(field.name, "* \n\n");
              if (params.isTime == 'morning') {
                message += "Semangat Pagi!\n          \nBerikut PO Outstandng yang perlu diaudit:";
              } else {
                message += "Walau sudah siang, kita harus tetap semangat!\n          \nBerikut ini ada tambahan PO Outstanding yang perlu diaudit:\n";
              }
              var data = Pu.map(function (o) {
                return [o.sheet_no, o.mny_no, o.amt];
              });
              var config = {
                columns: [{
                  width: 20
                }],
                border: (0, _table.getBorderCharacters)("norc")
              };
              message += "\n".concat((0, _table.table)(data, config), "\n");
              message += "\n\nMohon dilakukan verifikasinya ya ".concat(field.gender, ". ").concat(field.name, ",\napabila ada pertanyaan lebih lanjut bisa menghubungi tim purchasing secara langsung.\n        \nThank you and have a nice day! \uD83D\uDE0A");
              sendMsg({
                number: field.number,
                msg: message
              });
            });
            return _context2.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
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