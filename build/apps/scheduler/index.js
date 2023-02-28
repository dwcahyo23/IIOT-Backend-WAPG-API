"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _MnWo = _interopRequireDefault(require("../Mn-Wo"));
var _PRPo = _interopRequireDefault(require("../PR-Po"));
var _QcLock = _interopRequireDefault(require("../Qc-Lock"));
var _dateFns = require("date-fns");
var _default = {
  getScheduler: function getScheduler() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var regulerJob, jobPPUMorning, jobPPUEvening;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //! Job Scheduler Reguler
            regulerJob = _nodeSchedule["default"].scheduleJob('1 * * * * *', function () {
              // MnWo.getClose()
              //   .then((res) => console.log(res))
              //   .catch((err) => console.log(err.message))
              // MnWo.getClose().then((res) => console.log(res))
              // QcLock.getLock().then((res) => console.log(res))
              // PRPo.getPPU({ isTime: 'evening' }).then((res) => console.log(res))
            }); //! Job Scheduler Custom
            jobPPUMorning = _nodeSchedule["default"].scheduleJob('1 0 8 * * 1-5', function () {
              _PRPo["default"].getPPU({
                isTime: 'morning'
              }).then(function (res) {
                return console.log(res);
              });
              console.log('jobPPU has been injected at ' + (0, _dateFns.format)(new Date(), 'dd-MM-yyyy HH:mm:ss'));
            });
            jobPPUEvening = _nodeSchedule["default"].scheduleJob('1 0 13 * * 1-5', function () {
              _PRPo["default"].getPPU({
                isTime: 'evening'
              }).then(function (res) {
                return console.log(res);
              });
              console.log('jobPPU has been injected at ' + (0, _dateFns.format)(new Date(), 'dd-MM-yyyy HH:mm:ss'));
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;