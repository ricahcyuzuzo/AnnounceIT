"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable comma-dangle */
var validation = function validation(user) {
  var schema = _joi["default"].object({
    id: _joi["default"].number().required(),
    email: _joi["default"].string().email().required(),
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    password: _joi["default"].string().required(),
    phoneNumber: _joi["default"].string().required(),
    address: _joi["default"].string().required(),
    isAdmin: _joi["default"]["boolean"]().required()
  });

  return schema.validate(user);
};

var validateSignin = function validateSignin(user) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return schema.validate(user);
};

var _default = {
  validateSignin: validateSignin,
  validation: validation
};
exports["default"] = _default;