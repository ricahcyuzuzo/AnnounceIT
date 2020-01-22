"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.db"));

var _user2 = _interopRequireDefault(require("../models/user.model"));

var _signIn = _interopRequireDefault(require("../models/signIn.model"));

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
      var _validate$validation = _user3["default"].validation((0, _user2["default"])(req)),
          error = _validate$validation.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }

      var exist = _user["default"].find(function (usr) {
        return usr.email === req.body.email;
      });

      if (exist) {
        res.status(409).json({
          status: 409,
          error: 'This Email already exists'
        });
      } else {
        _user["default"].push((0, _user2["default"])(req));

        res.status(201).json({
          status: 201,
          message: 'User Created Successfully',
          data: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            isAdmin: (0, _user2["default"])(req).isAdmin
          },
          token: _authenticate["default"].generateToken(req.body.email, _user["default"].length)
        });
      }
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _validate$validateSig = _user3["default"].validateSignin((0, _signIn["default"])(req)),
          error = _validate$validateSig.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }

      var userAccount = _user["default"].find(function (usr) {
        return usr.email === req.body.email;
      });

      if (!userAccount) {
        return res.status(401).json({
          status: 401,
          message: "Oops, You don't have an account yet, Please sign up"
        });
      }

      var verifyPassword = _authenticate["default"].checkPassword(req.body.password, userAccount.password);

      if (verifyPassword) {
        return res.status(202).json({
          status: 202,
          message: 'You are signed in successfully',
          token: _authenticate["default"].generateToken(userAccount.email, userAccount.id)
        });
      } else {
        return res.status(402).json({
          status: 402,
          message: 'SignIn Failed'
        });
      }
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;