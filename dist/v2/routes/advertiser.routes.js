"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _advertiser = _interopRequireDefault(require("../controllers/advertiser.controller"));

var _verifyLogin = _interopRequireDefault(require("../middlewares/verifyLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
var routes = (0, _express["default"])();
routes.post('/announcement', _verifyLogin["default"], _advertiser["default"].createAnnouncement);
routes.patch('/announcement/:id', _verifyLogin["default"], _advertiser["default"].updateAnnouncement);
routes.get('/announcement/:ownerId', _verifyLogin["default"], _advertiser["default"].viewAnnouncements);
routes.get('/announcement/', _verifyLogin["default"], _advertiser["default"].viewannouncementsbyState);
routes.get('/announcements/:announcementId', _verifyLogin["default"], _advertiser["default"].viewspecificAnnouncement);
var _default = routes;
exports["default"] = _default;