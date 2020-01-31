"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-shadow */

/* eslint-disable comma-dangle */

/* eslint-disable arrow-parens */
var user = function user(req) {
  var user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: _authenticate["default"].hashPassword(req.body.password),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  };
  return user;
};

var userLogin = function userLogin(req) {
  var user = {
    email: req.body.email,
    password: _authenticate["default"].hashPassword(req.body.password)
  };
  return user;
};

var _default = {
  user: user,
  userLogin: userLogin
};
exports["default"] = _default;