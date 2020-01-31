"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyLogin = _interopRequireDefault(require("../middlewares/verifyLogin"));

var _admin = _interopRequireDefault(require("../controllers/admin.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
var routes = (0, _express["default"])();
routes["delete"]('/announcement/:id', _verifyLogin["default"], _admin["default"].deleteAnnouncement);
routes.patch('/announcement/:id/sold', _verifyLogin["default"], _admin["default"].changeStatus);
routes.get('/allannouncements/', _verifyLogin["default"], _admin["default"].viewAllAnnouncements);
var _default = routes;
exports["default"] = _default;