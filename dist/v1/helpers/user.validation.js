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
    first_name: _joi["default"].string().required(),
    last_name: _joi["default"].string().required(),
    password: _joi["default"].string().required(),
    phoneNumber: _joi["default"].string().required(),
    address: _joi["default"].string().required(),
    is_admin: _joi["default"]["boolean"]().required()
  });

  return schema.validate(user);
};

var _default = validation;
exports["default"] = _default;