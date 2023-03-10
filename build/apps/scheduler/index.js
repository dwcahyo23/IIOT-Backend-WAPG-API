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
var _user = _interopRequireDefault(require("../user"));
var _default = {
  getScheduler: function getScheduler() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var regulerJob;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //! Job Scheduler Reguler
            regulerJob = _nodeSchedule["default"].scheduleJob('1 * * * * *', function () {
              // !update from user
              // user
              //   .getUser({ nik_pro: '55241d2b-dcc8-4502-88b9-ab12c7e140a3' })
              //   .then((res) => console.log(res))
              //   .catch((err) => console.log(err))

              _MnWo["default"].getOpen().then(function (res) {
                return console.log(res);
              });
              _MnWo["default"].getClose().then(function (res) {
                return console.log(res);
              });
              _QcLock["default"].getLock().then(function (res) {
                return console.log(res);
              });
              // PRPo.getPPU({ isTime: 'evening' }).then((res) => console.log(res))
            }); //! Job Scheduler Custom
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
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};
exports["default"] = _default;