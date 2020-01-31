"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/* eslint-disable no-useless-escape */

/* eslint-disable arrow-parens */

/* eslint-disable comma-dangle */
var validation = function validation(user) {
  var schema = _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    firstName: _joi["default"].string().required().trim().min(3).regex(/^[^\d\s!@£$%^&*()+=#^-_'"?{}]+$/).message({
      'string.pattern.base': 'firstname must consist only letters, no white spaces, no digits and no special character of any kind'
    }),
    lastName: _joi["default"].string().required().trim().min(3).regex(/^[^\d\s!@£$%^&*()+=#^-_'"?{}]+$/).message({
      'string.pattern.base': 'lastname must consist only letters, no white spaces, no digits and no special character of any kind'
    }),
    password: _joi["default"].string().required(),
    phoneNumber: _joi["default"].string().required().trim().regex(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/).message({
      'string.pattern.base': 'Phone number must be like this (XXX) XXX-XXXX | XXX-XXX-XXXX'
    }),
    address: _joi["default"].string().required().trim()
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
  validation: validation,
  validateSignin: validateSignin
};
exports["default"] = _default;