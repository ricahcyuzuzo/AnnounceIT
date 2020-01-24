"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _advertiser = _interopRequireDefault(require("../controllers/advertiser.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
var routes = (0, _express["default"])();
routes.post('/user/announcement', _advertiser["default"].createAnnouncement);
routes.patch('/user/announcement/:id', _advertiser["default"].updateAnnouncement);
routes.get('/user/announcements/:ownerId', _advertiser["default"].viewAnnouncements);
routes.get('/user/announcement/status/:status', _advertiser["default"].viewbyspecificState);
routes.get('/user/announcement/:id', _advertiser["default"].viewSpecificannouncement);
var _default = routes;
exports["default"] = _default;