"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var axios = require('axios');
var sendMsg = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return axios.post('http://localhost:5010/send-message', {
            number: params.number,
            message: params.message
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
  return function sendMsg(_x) {
    return _ref.apply(this, arguments);
  };
}();
var sendMsg2 = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return axios({
            method: 'post',
            url: 'http://localhost:5010/send-message',
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
  return function sendMsg2(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var sendMsgGroup = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return axios.post('http://localhost:5010/send-message-group', {
            name: params.name,
            message: params.message
          }).then(function (res) {
            return console.log(res.status);
          })["catch"](function (e) {
            return console.log(e.message);
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function sendMsgGroup(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var sendMsgGroup2 = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(params) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return axios({
            method: 'post',
            url: 'http://localhost:5010/send-message-group',
            data: {
              name: params.name,
              message: params.msg
            }
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function sendMsgGroup2(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var obj = {
  number: '082124610363',
  message: 'tes msg with axios'
};
var groupObj = {
  name: 'GALINDO TEST',
  message: 'test msg group with axios'
};

// sendMsg(obj)
// sendMsg2(obj)

sendMsgGroup(groupObj);