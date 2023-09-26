"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _PRPo = _interopRequireDefault(require("../PR-Po"));
var _QcLock = _interopRequireDefault(require("../Qc-Lock"));
var _Ews = _interopRequireDefault(require("../Ews"));
var _dateFns = require("date-fns");
var _workOrder = _interopRequireDefault(require("../maintenance/workOrder"));
var _default = {
  getScheduler: function getScheduler() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var regulerJob, ews1, ews2, ews3, ews4, ews5;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //! Job Scheduler Reguler
            regulerJob = _nodeSchedule["default"].scheduleJob('1 * * * * *', function () {
              // !update from user
              _workOrder["default"].getOpen().then(function (res) {
                return console.log(res);
              })["catch"](function (err) {
                return console.log(err);
              });
              _workOrder["default"].getClose().then(function (res) {
                return console.log(res);
              })["catch"](function (err) {
                return console.log(err);
              });
              _QcLock["default"].getLock().then(function (res) {
                return console.log(res);
              });
            }); // //! Job Scheduler EWS 2H
            ews1 = _nodeSchedule["default"].scheduleJob('1 0 8 * * *', function () {
              _Ews["default"].getCritical().then(function (res) {
                return console.log(res);
              });
            });
            ews2 = _nodeSchedule["default"].scheduleJob('1 0 10 * * *', function () {
              _Ews["default"].getCritical().then(function (res) {
                return console.log(res);
              });
            });
            ews3 = _nodeSchedule["default"].scheduleJob('1 0 13 * * *', function () {
              _Ews["default"].getCritical().then(function (res) {
                return console.log(res);
              });
            });
            ews4 = _nodeSchedule["default"].scheduleJob('1 0 15 * * *', function () {
              _Ews["default"].getCritical().then(function (res) {
                return console.log(res);
              });
            });
            ews5 = _nodeSchedule["default"].scheduleJob('1 0 17 * * *', function () {
              _Ews["default"].getCritical().then(function (res) {
                return console.log(res);
              });
            }); //! Job Scheduler PR
            // const jobPPUMorning = schedule.scheduleJob('1 0 8 * * 1-5', function () {
            //   PRPo.getPPU({ isTime: 'morning' }).then((res) => console.log(res))
            //   console.log(
            //     'jobPPU has been injected at ' +
            //       format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
            //   )
            // })
            // const jobPPUEvening = schedule.scheduleJob('1 0 13 * * 1-5', function () {
            //   PRPo.getPPU({ isTime: 'evening' }).then((res) => console.log(res))
            //   console.log(
            //     'jobPPU has been injected at ' +
            //       format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
            //   )
            // })
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;