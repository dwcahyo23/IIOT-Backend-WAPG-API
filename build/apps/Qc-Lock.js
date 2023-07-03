'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0
var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))
var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
)
var _db = _interopRequireDefault(require('../api/config/db'))
var _sequelize = require('sequelize')
var _Mad_qap_locm = require('../api/models/Mad_qap_locm')
var _config = _interopRequireDefault(require('config'))
var _lodash = _interopRequireDefault(require('lodash'))
var _axios = _interopRequireDefault(require('axios'))
var _dateFns = require('date-fns')
var _default = {
  getLock: function getLock(params) {
    return (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee5() {
        var error, User, Lock, upStsLock, sendMsg
        return _regenerator['default'].wrap(function _callee5$(_context5) {
          while (1)
            switch ((_context5.prev = _context5.next)) {
              case 0:
                error = []
                User = _lodash['default'].filter(
                  _config['default'].get('ConfigUsers.UserList'),
                  function (el) {
                    return _lodash['default'].includes(el.set, 'qc')
                  },
                )
                _context5.next = 4
                return _db['default'].query(
                  //where +: date(sch_ot.mad_qap_locm.ymd) = CURRENT_DATE and
                  "SELECT \n      sch_ot.mad_qap_locm.*, \n      sch_ot.bas_pdc_mast.pdc_name \n    FROM \n      sch_ot.mad_qap_locm \n      join sch_ot.bas_pdc_mast on sch_ot.mad_qap_locm.pdc_code = sch_ot.bas_pdc_mast.pdc_code \n    where       \n      sts_wa = 'N' \n    order by \n      sch_ot.mad_qap_locm.ymd asc",
                  {
                    type: _sequelize.QueryTypes.SELECT,
                  },
                )
              case 4:
                Lock = _context5.sent
                upStsLock = /*#__PURE__*/ (function () {
                  var _ref = (0, _asyncToGenerator2['default'])(
                    /*#__PURE__*/ _regenerator['default'].mark(function _callee(
                      params,
                    ) {
                      return _regenerator['default'].wrap(function _callee$(
                        _context,
                      ) {
                        while (1)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2
                              return _Mad_qap_locm.Mad_qap_locm.update(
                                {
                                  sts_wa: 'Y',
                                },
                                {
                                  where: {
                                    sheet_no: params.id,
                                  },
                                },
                              )
                            case 2:
                            case 'end':
                              return _context.stop()
                          }
                      },
                      _callee)
                    }),
                  )
                  return function upStsLock(_x) {
                    return _ref.apply(this, arguments)
                  }
                })()
                if (User.length < 1) {
                  error.push({
                    type: 'error',
                    message: 'User not found',
                  })
                }
                if (Lock.length < 1) {
                  error.push({
                    type: 'error',
                    message: 'Data qc-lock not found',
                  })
                }
                sendMsg = /*#__PURE__*/ (function () {
                  var _ref2 = (0, _asyncToGenerator2['default'])(
                    /*#__PURE__*/ _regenerator['default'].mark(
                      function _callee2(params) {
                        return _regenerator['default'].wrap(function _callee2$(
                          _context2,
                        ) {
                          while (1)
                            switch ((_context2.prev = _context2.next)) {
                              case 0:
                                _context2.next = 2
                                return (0, _axios['default'])({
                                  method: 'post',
                                  url: 'http://localhost:5010/send-message',
                                  data: {
                                    number: params.number,
                                    message: params.msg,
                                  },
                                })
                              case 2:
                              case 'end':
                                return _context2.stop()
                            }
                        },
                        _callee2)
                      },
                    ),
                  )
                  return function sendMsg(_x2) {
                    return _ref2.apply(this, arguments)
                  }
                })()
                if (!(error.length === 0)) {
                  _context5.next = 12
                  break
                }
                _lodash['default'].forEach(
                  User,
                  /*#__PURE__*/ (function () {
                    var _ref3 = (0, _asyncToGenerator2['default'])(
                      /*#__PURE__*/ _regenerator['default'].mark(
                        function _callee4(field) {
                          var msg
                          return _regenerator['default'].wrap(
                            function _callee4$(_context4) {
                              while (1)
                                switch ((_context4.prev = _context4.next)) {
                                  case 0:
                                    msg = '*Good day! '
                                      .concat(field.gender, ' ')
                                      .concat(field.name, '*\n')
                                    msg +=
                                      '\nBerikut info QC-Lock saat ini:\n\n-----------------------------------------------------------------'
                                    _lodash['default'].forEach(
                                      Lock,
                                      /*#__PURE__*/ (function () {
                                        var _ref4 = (0,
                                        _asyncToGenerator2['default'])(
                                          /*#__PURE__*/ _regenerator[
                                            'default'
                                          ].mark(function _callee3(record, i) {
                                            return _regenerator['default'].wrap(
                                              function _callee3$(_context3) {
                                                while (1)
                                                  switch (
                                                    (_context3.prev =
                                                      _context3.next)
                                                  ) {
                                                    case 0:
                                                      msg += '\n*'
                                                        .concat(
                                                          i + 1,
                                                          '. Sheet_no:* ',
                                                        )
                                                        .concat(
                                                          record.sheet_no,
                                                          '\n*Product:* ',
                                                        )
                                                        .concat(
                                                          record.pdc_name,
                                                          '\n*Travel Card:* ',
                                                        )
                                                        .concat(
                                                          record.bat_card,
                                                          '\n*Fragment:* ',
                                                        )
                                                        .concat(
                                                          record.bat_card_2,
                                                          ' | ',
                                                        )
                                                        .concat(
                                                          record.stk_no_2,
                                                          '\n\n*Problem:* ',
                                                        )
                                                        .concat(
                                                          record.problem,
                                                          '\n*Standard:* ',
                                                        )
                                                        .concat(
                                                          record.standard,
                                                          '\n*Result:* ',
                                                        )
                                                        .concat(
                                                          record.result,
                                                          '\n-----------------------------------------------------------------',
                                                        )
                                                      upStsLock({
                                                        id: record.sheet_no,
                                                      })
                                                    case 2:
                                                    case 'end':
                                                      return _context3.stop()
                                                  }
                                              },
                                              _callee3,
                                            )
                                          }),
                                        )
                                        return function (_x4, _x5) {
                                          return _ref4.apply(this, arguments)
                                        }
                                      })(),
                                    )
                                    msg +=
                                      '\n\nThank you and have a nice day! \uD83D\uDE0A'
                                    sendMsg({
                                      number: field.number,
                                      msg: msg,
                                    })
                                  case 5:
                                  case 'end':
                                    return _context4.stop()
                                }
                            },
                            _callee4,
                          )
                        },
                      ),
                    )
                    return function (_x3) {
                      return _ref3.apply(this, arguments)
                    }
                  })(),
                )
                return _context5.abrupt('return', {
                  type: 'succes',
                  message: 'message sended successfully',
                })
              case 12:
                return _context5.abrupt('return', error)
              case 13:
              case 'end':
                return _context5.stop()
            }
        }, _callee5)
      }),
    )()
  },
}
exports['default'] = _default
