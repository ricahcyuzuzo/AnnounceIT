"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable comma-dangle */
var validation = function validation(announcement) {
  var schema = _joi["default"].object({
    id: _joi["default"].number().required(),
    owner: _joi["default"].number().required(),
    status: _joi["default"].string().required().trim(),
    text: _joi["default"].string().required().min(50).trim(),
    startDate: _joi["default"].date().required(),
    endDate: _joi["default"].date().required()
  });

  return schema.validate(announcement);
};

var _default = validation;
exports["default"] = _default;