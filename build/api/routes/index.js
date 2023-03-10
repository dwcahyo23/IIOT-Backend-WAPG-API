"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MntnWoController = _interopRequireDefault(require("../controllers/Mntn-WoController"));
var _default = function _default(app) {
  app.post('/api/MntWo', _MntnWoController["default"].getWo);
  app.post('/api/User', _MntnWoController["default"].getUser);
};
exports["default"] = _default;