"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _config = _interopRequireDefault(require("../config/config"));

var _announcement = _interopRequireDefault(require("../models/announcement.query"));

var _announcement2 = _interopRequireDefault(require("../models/announcement.model"));

var _announcement3 = _interopRequireDefault(require("../helpers/announcement.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _createAnnouncement = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var token, decoded, _validate, error, ownerId, status, _req$body, text, startDate, endDate, added, exists, exist;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1];
                decoded = (0, _jwtDecode["default"])(token);
                _validate = (0, _announcement3["default"])((0, _announcement2["default"])(req)), error = _validate.error;

                if (!error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  errorMessage: error.details[0].message.replace(/"/g, '')
                }));

              case 5:
                ownerId = decoded.user.id;
                status = 'pending';
                _req$body = req.body, text = _req$body.text, startDate = _req$body.startDate, endDate = _req$body.endDate;
                _context.next = 10;
                return _config["default"].query(_announcement["default"].createAnnouncement, [ownerId, status, text, startDate, endDate]);

              case 10:
                added = _context.sent;

                if (!(added.rowCount === 1)) {
                  _context.next = 17;
                  break;
                }

                _context.next = 14;
                return _config["default"].query(_announcement["default"].getOne, [text]);

              case 14:
                exists = _context.sent;
                exist = exists.rows[0];
                res.status(201).json({
                  status: 201,
                  message: 'Announcement created successfully!',
                  data: exist
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createAnnouncement(_x, _x2) {
        return _createAnnouncement.apply(this, arguments);
      }

      return createAnnouncement;
    }()
  }, {
    key: "updateAnnouncement",
    value: function () {
      var _updateAnnouncement = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var exist, _req$body2, text, startDate, endDate, updated, exists;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _config["default"].query(_announcement["default"].getOneUpdate, [req.params.id]);

              case 2:
                exist = _context2.sent;

                if (!(exist.rowCount === 0)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  errorMessage: 'Announcement not found!'
                }));

              case 5:
                _req$body2 = req.body, text = _req$body2.text, startDate = _req$body2.startDate, endDate = _req$body2.endDate;
                _context2.next = 8;
                return _config["default"].query(_announcement["default"].updateAnnouncement, [text, startDate, endDate, req.params.id]);

              case 8:
                updated = _context2.sent;

                if (!(updated.rowCount === 1)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 12;
                return _config["default"].query(_announcement["default"].getOneUpdate, [req.params.id]);

              case 12:
                exists = _context2.sent;
                res.status(200).json({
                  status: 200,
                  message: 'Announcement updated successfully!',
                  data: exists.rows[0]
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateAnnouncement(_x3, _x4) {
        return _updateAnnouncement.apply(this, arguments);
      }

      return updateAnnouncement;
    }()
  }, {
    key: "viewAnnouncements",
    value: function () {
      var _viewAnnouncements = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var announcements;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _config["default"].query(_announcement["default"].getmyAnnouncements, [req.params.ownerId]);

              case 2:
                announcements = _context3.sent;

                if (announcements.rowCount === 0) {
                  res.status(404).json({
                    status: 404,
                    errorMessage: "You don't have yet any announcement!"
                  });
                } else {
                  res.status(200).json({
                    status: 200,
                    message: 'Here are all your announcements',
                    data: announcements.rows
                  });
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function viewAnnouncements(_x5, _x6) {
        return _viewAnnouncements.apply(this, arguments);
      }

      return viewAnnouncements;
    }()
  }, {
    key: "viewannouncementsbyState",
    value: function () {
      var _viewannouncementsbyState = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var announcements;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _config["default"].query(_announcement["default"].getallbyState, [req.query.status]);

              case 2:
                announcements = _context4.sent;

                if (announcements.rowCount === 0) {
                  res.status(404).json({
                    status: 404,
                    errorMessage: 'No announcement on that status!'
                  });
                } else {
                  res.status(200).json({
                    status: 200,
                    message: "Here are all announcements by state ".concat(req.query.status),
                    data: announcements.rows
                  });
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function viewannouncementsbyState(_x7, _x8) {
        return _viewannouncementsbyState.apply(this, arguments);
      }

      return viewannouncementsbyState;
    }()
  }, {
    key: "viewspecificAnnouncement",
    value: function () {
      var _viewspecificAnnouncement = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var oneAnnouncement;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _config["default"].query(_announcement["default"].getAnnouncement, [req.params.announcementId]);

              case 2:
                oneAnnouncement = _context5.sent;

                if (oneAnnouncement.rowCount === 0) {
                  res.status(404).json({
                    status: 404,
                    errorMessage: 'The announcement not found!'
                  });
                } else {
                  res.status(200).json({
                    status: 200,
                    message: 'Here is the announcement',
                    data: oneAnnouncement.rows[0]
                  });
                }

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function viewspecificAnnouncement(_x9, _x10) {
        return _viewspecificAnnouncement.apply(this, arguments);
      }

      return viewspecificAnnouncement;
    }()
  }]);

  return advertiserController;
}();

var _default = advertiserController;
exports["default"] = _default;