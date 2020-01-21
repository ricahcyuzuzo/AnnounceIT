"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authController =
/*#__PURE__*/
function () {
  function authController() {
    _classCallCheck(this, authController);
  }

  _createClass(authController, null, [{
    key: "signup",
    value: function signup(req, res) {
      var user = {
        id: _user["default"].length + 1,
        names: req.body.names,
        email: req.body.email
      };

      _user["default"].push(user);

      res.status(201).send({
        status: "success",
        data: user
      });
    }
  }, {
    key: "viewUsers",
    value: function viewUsers(req, res) {
      res.status(200).send({
        status: "success",
        data: _user["default"]
      });
    }
  }]);

  return authController;
}();

var _default = authController;
exports["default"] = _default;