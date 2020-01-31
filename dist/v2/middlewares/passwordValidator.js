"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passwordValidator = _interopRequireDefault(require("password-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable new-cap */
var validatePassword = function validatePassword(password) {
  var schema = new _passwordValidator["default"]();
  schema.is().min(8).is().max(100).has().lowercase().has().uppercase().has().digits().has().not().spaces().has().symbols();
  return schema.validate(password);
};

var _default = validatePassword;
exports["default"] = _default;