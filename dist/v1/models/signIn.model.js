"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */

/* eslint-disable arrow-parens */
var userLogin = function userLogin(req) {
  var user = {
    email: req.body.email,
    password: _authenticate["default"].hashPassword(req.body.password)
  };
  return user;
};

var _default = userLogin;
exports["default"] = _default;