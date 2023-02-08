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
var _default = {
  getUpdate: function getUpdate() {
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
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [_sequelize.Sequelize.where(_sequelize.Sequelize.fn('date', _sequelize.Sequelize.col('ymd')), '>', '2023-02-07'), {
                sts_wa: (0, _defineProperty2["default"])({}, _sequelize.Op.eq, 'Y')
              }])
            });
          case 4:
            Wo = _context2.sent;
            if (User.length < 1) {
              error.push({
                type: 'error',
                message: 'User not found'
              });
            }
            if (!(Wo.length < 1)) {
              _context2.next = 9;
              break;
            }
            error.push({
              type: 'error',
              message: 'Data mntn-wo not found'
            });
            return _context2.abrupt("return", error);
          case 9:
            if (!(error.length === 0)) {
              _context2.next = 12;
              break;
            }
            // let msg = 'Workorder'
            // _.forEach(Wo, (el) => {
            //   msg += `sheet_no ${el.sheet_no}`
            // })

            _lodash["default"].forEach(User, /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(el) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _lodash["default"].forEach(Wo, function (record) {
                        var msg = 'Work Order by Erp';
                        (0, _axios["default"])({
                          method: 'post',
                          url: 'http://localhost:5010/send-message',
                          data: {
                            number: el.number,
                            message: msg += "\n Sheet_no : ".concat(record.sheet_no)
                          }
                        });
                      });
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", {
              type: 'succes',
              message: 'message sended successfully'
            });
          case 12:
            return _context2.abrupt("return", error);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};
exports["default"] = _default;