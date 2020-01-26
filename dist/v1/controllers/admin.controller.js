"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _announcement = _interopRequireDefault(require("../models/announcement.db"));

var _announcement2 = _interopRequireDefault(require("../models/announcement.model"));

var _announcement3 = _interopRequireDefault(require("../helpers/announcement.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var adminController =
/*#__PURE__*/
function () {
  function adminController() {
    _classCallCheck(this, adminController);
  }

  _createClass(adminController, null, [{
    key: "viewAllAnnouncement",
    value: function viewAllAnnouncement(req, res) {
      res.status(200).json({
        status: 200,
        message: 'View all announcements',
        data: _announcement["default"]
      });
    }
  }, {
    key: "deleteAnnouncement",
    value: function deleteAnnouncement(req, res) {
      var exist = _announcement["default"].find(function (ann) {
        return ann.id === parseInt(req.params.id);
      });

      if (!exist) {
        return res.status(404).json({
          status: 404,
          message: 'Not announcement found!'
        });
      }

      _announcement["default"].splice(_announcement["default"].indexOf(exist), 1);

      res.status(202).json({
        status: 202,
        message: 'Deleted'
      });
    }
  }, {
    key: "updateAnnouncementStatus",
    value: function updateAnnouncementStatus(req, res) {
      var exist = _announcement["default"].find(function (ann) {
        return ann.id === parseInt(req.params.id);
      });

      if (!exist) {
        return res.status(404).json({
          status: 404,
          errorMessage: 'Announcement Not Found!'
        });
      }

      var _validate = (0, _announcement3["default"])((0, _announcement2["default"])(req)),
          error = _validate.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }

      exist.status = req.body.status;
      return res.status(200).json({
        status: 200,
        message: 'Announcement Status Changed!',
        data: {
          owner: req.body.owner,
          status: (0, _announcement2["default"])(req).status,
          text: req.body.text,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        }
      });
    }
  }]);

  return adminController;
}();

var _default = adminController;
exports["default"] = _default;