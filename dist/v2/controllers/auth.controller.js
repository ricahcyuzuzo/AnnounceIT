"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _user = _interopRequireDefault(require("../models/user.query"));

var _user2 = _interopRequireDefault(require("../models/user.model"));

var _user3 = _interopRequireDefault(require("../helpers/user.validation"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

var _config = _interopRequireDefault(require("../config/config"));

var _passwordValidator = _interopRequireDefault(require("../middlewares/passwordValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var email, lemail, _validate$validation, error, exist, _req$body, firstName, lastName, phoneNumber, address, isAdmin, password, added, exists;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email;
                lemail = email.toLowerCase();
                _validate$validation = _user3["default"].validation(_user2["default"].user(req)), error = _validate$validation.error;

                if (!error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  errorMessage: error.details[0].message.replace(/"/g, '')
                }));

              case 5:
                if (!((0, _passwordValidator["default"])(req.body.password) === true)) {
                  _context.next = 26;
                  break;
                }

                _context.next = 8;
                return _config["default"].query(_user["default"].getOne, [lemail]);

              case 8:
                exist = _context.sent;

                if (!exist.rows[0]) {
                  _context.next = 13;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  errorMessage: 'Email already exist!'
                });
                _context.next = 24;
                break;

              case 13:
                // eslint-disable-next-line object-curly-newline
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber, address = _req$body.address;
                isAdmin = 'false';
                password = _authenticate["default"].hashPassword(req.body.password);
                _context.next = 18;
                return _config["default"].query(_user["default"].signupQuery, [lemail, firstName, lastName, password, phoneNumber, address, isAdmin]);

              case 18:
                added = _context.sent;

                if (!(added.rowCount === 1)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 22;
                return _config["default"].query(_user["default"].getOne, [lemail]);

              case 22:
                exists = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'User created successfully!',
                  data: exists.rows[0],
                  token: _authenticate["default"].generateToken(exists.rows[0])
                }));

              case 24:
                _context.next = 27;
                break;

              case 26:
                res.status(400).json({
                  status: 400,
                  errorMessage: 'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character'
                });

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validate$validateSig, error, _req$body2, email, password, lemail, account, compare;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validate$validateSig = _user3["default"].validateSignin(_user2["default"].userLogin(req)), error = _validate$validateSig.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  errorMessage: error.details[0].message.replace(/"/g, '')
                }));

              case 3:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                lemail = email.toLowerCase();
                _context2.next = 7;
                return _config["default"].query(_user["default"].getOneLogin, [lemail]);

              case 7:
                account = _context2.sent;

                if (account.rowCount > 0) {
                  compare = _authenticate["default"].checkPassword(password, account.rows[0].password);

                  if (compare) {
                    res.status(200).json({
                      status: 200,
                      message: "".concat(account.rows[0].email, " is signed in Successfully!"),
                      token: _authenticate["default"].generateToken(account.rows[0])
                    });
                  } else {
                    res.status(401).json({
                      status: 401,
                      errorMessage: 'Wrong email or password'
                    });
                  }
                } else {
                  res.status(404).json({
                    status: 404,
                    errorMessage: 'Wrong email or password'
                  });
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }, {
    key: "adminRegister",
    value: function () {
      var _adminRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var token, decoded, email, lemail, _validate$validation2, error, exist, _req$body3, firstName, lastName, phoneNumber, address, isAdmin, password, added, exists;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1];
                decoded = (0, _jwtDecode["default"])(token);

                if (!(decoded.user.isadmin === true)) {
                  _context3.next = 32;
                  break;
                }

                email = req.body.email;
                lemail = email.toLowerCase();
                _validate$validation2 = _user3["default"].validation(_user2["default"].user(req)), error = _validate$validation2.error;

                if (!error) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 400,
                  errorMessage: error.details[0].message.replace(/"/g, '')
                }));

              case 8:
                if (!((0, _passwordValidator["default"])(req.body.password) === true)) {
                  _context3.next = 29;
                  break;
                }

                _context3.next = 11;
                return _config["default"].query(_user["default"].getOne, [lemail]);

              case 11:
                exist = _context3.sent;

                if (!exist.rows[0]) {
                  _context3.next = 16;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  errorMessage: 'Email already exist!'
                });
                _context3.next = 27;
                break;

              case 16:
                // eslint-disable-next-line object-curly-newline
                _req$body3 = req.body, firstName = _req$body3.firstName, lastName = _req$body3.lastName, phoneNumber = _req$body3.phoneNumber, address = _req$body3.address;
                isAdmin = 'true';
                password = _authenticate["default"].hashPassword(req.body.password);
                _context3.next = 21;
                return _config["default"].query(_user["default"].signupQuery, [lemail, firstName, lastName, password, phoneNumber, address, isAdmin]);

              case 21:
                added = _context3.sent;

                if (!(added.rowCount === 1)) {
                  _context3.next = 27;
                  break;
                }

                _context3.next = 25;
                return _config["default"].query(_user["default"].getOne, [lemail]);

              case 25:
                exists = _context3.sent;
                return _context3.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'User admin created successfully!',
                  data: exists.rows[0],
                  token: _authenticate["default"].generateToken(exists.rows[0])
                }));

              case 27:
                _context3.next = 30;
                break;

              case 29:
                res.status(400).json({
                  status: 400,
                  errorMessage: 'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character'
                });

              case 30:
                _context3.next = 33;
                break;

              case 32:
                res.status(401).json({
                  status: 401,
                  errorMessage: 'You are not allowed for this action!'
                });

              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function adminRegister(_x5, _x6) {
        return _adminRegister.apply(this, arguments);
      }

      return adminRegister;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;