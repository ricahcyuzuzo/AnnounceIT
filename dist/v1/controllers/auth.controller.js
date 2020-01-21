"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.db"));

var _user2 = _interopRequireDefault(require("../models/user.model"));

var _user3 = _interopRequireDefault(require("../helpers/user.validation"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signUp",
    value: function signUp(req, res) {
      var _validate = (0, _user3["default"])((0, _user2["default"])(req)),
          error = _validate.error;

      if (error) {
        return res.status(400).json({
          status: 'error',
          error: error.details[0].message.replace(/"/g, '')
        });
      }

      var exist = _user["default"].find(function (usr) {
        return usr.email === req.body.email;
      });

      if (exist) {
        res.status(409).json({
          status: 'error',
          error: 'This Email already exists'
        });
      } else {
        _user["default"].push((0, _user2["default"])(req));

        res.status(201).json({
          status: 'success',
          data: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
          },
          token: _authenticate["default"].generateToken(req.body.email, _user["default"].length)
        });
      }
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;