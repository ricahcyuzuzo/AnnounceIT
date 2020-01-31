"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _verifyLogin = _interopRequireDefault(require("../middlewares/verifyLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])();
routes.post('/auth/signup', _auth["default"].signUp);
routes.post('/auth/signin', _auth["default"].signIn);
routes.post('/auth/admin', _verifyLogin["default"], _auth["default"].adminRegister);
var _default = routes;
exports["default"] = _default;