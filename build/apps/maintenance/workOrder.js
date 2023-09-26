"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _lodash = _interopRequireDefault(require("lodash"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var newsOpen = function newsOpen() {
  return new Promise(function (resolve, reject) {
    try {
      _axios["default"].get('http://192.168.192.7:5000/newsWorderOpen').then(function (x) {
        console.log('fetch newsWorderOpen');
        resolve(x.data);
      })["catch"](function (err) {
        console.log(err);
        reject(err);
      });
    } catch (err) {
      {
        console.log(err);
        reject(err);
      }
    }
  });
};
var newsClose = function newsClose() {
  return new Promise(function (resolve, reject) {
    try {
      _axios["default"].get('http://192.168.192.7:5000/newsWorderClose').then(function (x) {
        console.log('fetch newsWorderClose');
        resolve(x.data);
      })["catch"](function (err) {
        console.log(err);
        reject(err);
      });
    } catch (err) {
      {
        console.log(err);
        reject(err);
      }
    }
  });
};
var sendMsgUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _axios["default"].post('http://192.168.192.7:5010/send-message', {
            number: params.number,
            message: params.msg
          }).then(function (res) {
            return console.log(res.status);
          })["catch"](function (e) {
            return console.log(e.message);
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendMsgUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = {
  getOpen: function getOpen() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              newsOpen().then(function (data) {
                // console.log(data)
                _lodash["default"].forEach(data, function (val) {
                  var msg = "Hello ".concat(val.name, ", this is the current state of *Work Order Open* :");
                  _lodash["default"].forEach(val.msg, function (msgContext, numberContext) {
                    msg += "\n\n".concat(numberContext + 1, ".*").concat(msgContext.sheet_no, "* | ").concat(msgContext.pri_no == '01' || msgContext.pri_no == '1' ? '*Breakdown* ❌' : msgContext.pri_no == '02' || msgContext.pri_no == '2' ? '*Still Run* ⌛️' : msgContext.pri_no == '03' || msgContext.pri_no == '3' ? '*Preventive* 🔧' : msgContext.pri_no == '04' || msgContext.pri_no == '4' ? '*Workshop Still Run* ⌛️' : msgContext.pri_no == '05' || msgContext.pri_no == '5' ? '*Workshop Breakdown* ❌' : msgContext.pri_no == '06' || msgContext.pri_no == '6' ? '*Project (Machinery)* 🔧' : msgContext.pri_no == '07' || msgContext.pri_no == '7' ? '*Project (Workshop)* 🔧' : 'undefined');
                    msg += "\n*Machine :* ".concat(msgContext.mch_no, " | ").concat(msgContext.dep_no, " | ").concat(msgContext.com_no == '01' ? 'GM1' : msgContext.com_no == '02' ? 'GM2' : msgContext.com_no == '03' ? 'GM3' : msgContext.com_no == '06' ? 'GM5' : 'undefined');
                    msg += "\n*Open :* ".concat((0, _dayjs["default"])(msgContext.ymd).format('DD/MM/YYYY HH:mm'));
                    msg += "\n*Problem:* ".concat(msgContext.s_memo, "\n*Remarks:* ").concat(msgContext.memo);
                  });
                  if (_lodash["default"].isArray(val.msg) && val.msg.length > 0) {
                    sendMsgUser({
                      number: val.number,
                      msg: msg
                    });
                  } else {
                    console.log('news worderOpen not found');
                  }
                });
              })["catch"](function (err) {
                return console.log(err);
              });
            } catch (error) {
              console.log(error);
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getClose: function getClose() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return newsClose().then(function (data) {
              _lodash["default"].forEach(data, function (val) {
                var msg = "Hallo ".concat(val.name, ", this is the current state of *Work Order Close* :");
                _lodash["default"].forEach(val.msg, function (msgContext, numberContext) {
                  msg += "\n\n".concat(numberContext + 1, ".*").concat(msgContext.sheet_no, "* | ").concat(msgContext.pri_no == '01' || msgContext.pri_no == '1' ? '*Breakdown* ✅' : msgContext.pri_no == '02' || msgContext.pri_no == '2' ? '*Still Run* ✅' : msgContext.pri_no == '03' || msgContext.pri_no == '3' ? '*Preventive* ✅' : msgContext.pri_no == '04' || msgContext.pri_no == '4' ? '*Workshop Still Run* ✅' : msgContext.pri_no == '05' || msgContext.pri_no == '5' ? '*Workshop Breakdown* ✅' : msgContext.pri_no == '06' || msgContext.pri_no == '6' ? '*Project (Machinery)* ✅' : msgContext.pri_no == '07' || msgContext.pri_no == '7' ? '*Project (Workshop)* ✅' : 'undefined');
                  msg += "\n*Machine :* ".concat(msgContext.mch_no, " | ").concat(msgContext.dep_no, " | ").concat(msgContext.com_no == '01' ? 'GM1' : msgContext.com_no == '02' ? 'GM2' : msgContext.com_no == '03' ? 'GM3' : msgContext.com_no == '06' ? 'GM5' : 'undefined');
                  msg += "\n*Open :* ".concat((0, _dayjs["default"])(msgContext.ymd).format('DD/MM/YYYY HH:mm'));
                  msg += "\n*Close :* ".concat((0, _dayjs["default"])(msgContext.chk_date).format('DD/MM/YYYY HH:mm'));
                  msg += "\n*Total time :* ".concat((0, _dayjs["default"])(msgContext.chk_date).diff((0, _dayjs["default"])(msgContext.ymd), 'h', true).toFixed(1), " hour \u23F1");
                  msg += "\n*Problem:* ".concat(msgContext.s_memo, "\n*Remarks:* ").concat(msgContext.memo);
                });
                if (_lodash["default"].isArray(val.msg) && val.msg.length > 0) {
                  sendMsgUser({
                    number: val.number,
                    msg: msg
                  });
                } else {
                  console.log('news worderOpen not found');
                }
              });
            })["catch"](function (err) {
              return console.log(err);
            });
          case 3:
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  }
};
exports["default"] = _default;