"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = _interopRequireDefault(require("../controllers/admin.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
var routes = (0, _express["default"])();
routes.get('/admin/announcement', _admin["default"].viewAllAnnouncement);
routes["delete"]('/admin/announcement/:id', _admin["default"].deleteAnnouncement);
routes.patch('/admin/announcement/:id', _admin["default"].updateAnnouncementStatus);
var _default = routes;
exports["default"] = _default;