"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user.db"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-shadow */

/* eslint-disable comma-dangle */

/* eslint-disable arrow-parens */
var user = function user(req) {
  var user = {
    id: _user["default"].length + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: _authenticate["default"].hashPassword(req.body.password),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    is_admin: 'true'
  };
  return user;
};

var _default = user;
exports["default"] = _default;