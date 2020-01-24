"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _announcement = _interopRequireDefault(require("../models/announcement.db"));

var _announcement2 = _interopRequireDefault(require("../models/announcement.model"));

var _user = _interopRequireDefault(require("../models/user.db"));

var _announcement3 = _interopRequireDefault(require("../helpers/announcement.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var advertiserController =
/*#__PURE__*/
function () {
  function advertiserController() {
    _classCallCheck(this, advertiserController);
  }

  _createClass(advertiserController, null, [{
    key: "createAnnouncement",
    value: function createAnnouncement(req, res) {
      var _validate = (0, _announcement3["default"])((0, _announcement2["default"])(req)),
          error = _validate.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }

      var exist = _user["default"].find(function (usr) {
        return usr.id === req.body.owner;
      });

      if (!exist) {
        res.status(404).json({
          status: 404,
          errorMessage: 'Owner Not found!'
        });
      } else {
        _announcement["default"].push((0, _announcement2["default"])(req));

        res.status(201).json({
          status: 201,
          message: 'Announcement created successfully',
          data: {
            owner: req.body.owner,
            status: req.body.status,
            text: req.body.text,
            startDate: req.body.startDate,
            endDate: req.body.endDate
          }
        });
      }
    }
  }, {
    key: "updateAnnouncement",
    value: function updateAnnouncement(req, res) {
      var exist = _announcement["default"].find(function (ann) {
        return ann.id === parseInt(req.params.id);
      });

      if (!exist) {
        return res.status(404).json({
          status: 404,
          errorMessage: 'Announcement Not Found!'
        });
      }

      var _validate2 = (0, _announcement3["default"])((0, _announcement2["default"])(req)),
          error = _validate2.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }

      _announcement["default"].text = req.body.text;
      _announcement["default"].owner = req.body.owner;
      _announcement["default"].startDate = req.body.startDate;
      _announcement["default"].endDate = req.body.endDate;
      return res.status(200).json({
        status: 200,
        message: 'Announcement Updated!',
        data: {
          owner: req.body.owner,
          status: (0, _announcement2["default"])(req).status,
          text: req.body.text,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        }
      });
    }
  }, {
    key: "viewAnnouncements",
    value: function viewAnnouncements(req, res) {
      var announces = _announcement["default"].filter(function (ann) {
        return ann.owner === parseInt(req.params.ownerId);
      });

      if (announces.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'You have not yet any announcement!'
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Here are all your announcemts',
        data: announces
      });
    }
  }, {
    key: "viewbyspecificState",
    value: function viewbyspecificState(req, res) {
      var announces = _announcement["default"].filter(function (ann) {
        return ann.status === req.params.status;
      });

      if (announces.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No announcements assigned to this status'
        });
      }

      res.status(200).json({
        status: 200,
        message: "Here all announcements assigned to ".concat(announces.status),
        data: announces
      });
    }
  }, {
    key: "viewSpecificannouncement",
    value: function viewSpecificannouncement(req, res) {
      var announces = _announcement["default"].find(function (ann) {
        return ann.id === parseInt(req.params.id);
      });

      if (!announces) {
        return res.status(404).json({
          status: 404,
          message: 'Announcement not found!'
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Get this announcement',
        data: announces
      });
    }
  }]);

  return advertiserController;
}();

var _default = advertiserController;
exports["default"] = _default;