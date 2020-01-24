"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _announcement = _interopRequireDefault(require("./announcement.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable comma-dangle */
var announcement = function announcement(req) {
  var announce = {
    id: _announcement["default"].length + 1,
    owner: req.body.owner,
    status: 'pending',
    text: req.body.text,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  return announce;
};

var _default = announcement;
exports["default"] = _default;