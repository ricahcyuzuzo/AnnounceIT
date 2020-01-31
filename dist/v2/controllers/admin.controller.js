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

var adminController =
/*#__PURE__*/
function () {
  function adminController() {
    _classCallCheck(this, adminController);
  }

  _createClass(adminController, null, [{
    key: "deleteAnnouncement",
    value: function () {
      var _deleteAnnouncement = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var token, decoded, exist, deleted;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1];
                decoded = (0, _jwtDecode["default"])(token);

                if (!(decoded.user.isadmin === true)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 5;
                return _config["default"].query(_announcement["default"].getOneUpdate, [req.params.id]);

              case 5:
                exist = _context.sent;

                if (!(exist.rowCount === 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  errorMessage: 'Announcement not found!'
                }));

              case 8:
                _context.next = 10;
                return _config["default"].query(_announcement["default"].deleteAnnouncement, [req.params.id]);

              case 10:
                deleted = _context.sent;

                if (!(deleted.rowCount > 0)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", res.status(202).json({
                  status: 202,
                  message: 'Announcement deleted'
                }));

              case 13:
                _context.next = 16;
                break;

              case 15:
                res.status(401).json({
                  status: 401,
                  errorMessage: 'You are not allowed for this action!'
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function deleteAnnouncement(_x, _x2) {
        return _deleteAnnouncement.apply(this, arguments);
      }

      return deleteAnnouncement;
    }()
  }, {
    key: "changeStatus",
    value: function () {
      var _changeStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var token, decoded, exist, updated, exists;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1];
                decoded = (0, _jwtDecode["default"])(token);

                if (!(decoded.user.isadmin === true)) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 5;
                return _config["default"].query(_announcement["default"].getOneUpdate, [req.params.id]);

              case 5:
                exist = _context2.sent;

                if (!(exist.rowCount === 0)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  errorMessage: 'Announcement not found!'
                }));

              case 8:
                _context2.next = 10;
                return _config["default"].query(_announcement["default"].changeStatus, [req.body.status, req.params.id]);

              case 10:
                updated = _context2.sent;

                if (!(updated.rowCount > 0)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return _config["default"].query(_announcement["default"].getOneUpdate, [req.params.id]);

              case 14:
                exists = _context2.sent;
                return _context2.abrupt("return", res.status(202).json({
                  status: 202,
                  message: 'Status of announcement changed!',
                  data: exists.rows[0]
                }));

              case 16:
                _context2.next = 19;
                break;

              case 18:
                res.status(401).json({
                  status: 401,
                  errorMessage: 'You are not allowed for this action!'
                });

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function changeStatus(_x3, _x4) {
        return _changeStatus.apply(this, arguments);
      }

      return changeStatus;
    }()
  }, {
    key: "viewAllAnnouncements",
    value: function () {
      var _viewAllAnnouncements = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var token, decoded, getall;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1];
                decoded = (0, _jwtDecode["default"])(token);

                if (!(decoded.user.isadmin === true)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 5;
                return _config["default"].query(_announcement["default"].getallAnnouncements);

              case 5:
                getall = _context3.sent;

                if (!(getall.rowCount > 0)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Here are all announcements!',
                  data: getall.rows[0]
                }));

              case 8:
                _context3.next = 11;
                break;

              case 10:
                res.status(401).json({
                  status: 401,
                  errorMessage: 'You are not allowed for this action!'
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function viewAllAnnouncements(_x5, _x6) {
        return _viewAllAnnouncements.apply(this, arguments);
      }

      return viewAllAnnouncements;
    }()
  }]);

  return adminController;
}();

var _default = adminController;
exports["default"] = _default;