"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable arrow-parens */

/* eslint-disable comma-dangle */
var announcement = function announcement(req) {
  var announce = {
    text: req.body.text,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  return announce;
};

var _default = announcement;
exports["default"] = _default;