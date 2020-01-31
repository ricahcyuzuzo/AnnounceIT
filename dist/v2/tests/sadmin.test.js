"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

var _config = _interopRequireDefault(require("../config/config"));

var _user = _interopRequireDefault(require("../models/user.query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the admin register  feature with the database', function () {
  var user1 = {
    email: 'testes@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test',
    isAdmin: true
  };
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _config["default"].query(_user["default"].signupQuery, [user1.email, user1.firstName, user1.lastName, user1.password, user1.phoneNumber, user1.address, user1.isAdmin]);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  var user = {
    email: 'admin@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '(078) 456-7827',
    address: 'Test'
  };
  var user2 = {
    email: 'admintest.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test'
  };
  var user3 = {
    email: 'admin@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };
  var user4 = {
    email: 'adminn@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: 'test',
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };
  var userLogin = {
    email: 'testes@test.com',
    password: 'Testing123!'
  };

  var falseToken = _authenticate["default"].generateToken(user3);

  it('Should create the user admin', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(userLogin).then(function (loginResponse) {
      var token = loginResponse.body.token;

      _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user).set('Authorization', "bearer ".concat(token)).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'User admin created successfully!');
        done();
      });
    });
  });
  it('Should not create user admin if there is validation error', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(userLogin).then(function (loginResponse) {
      var token = loginResponse.body.token;

      _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user2).set('Authorization', "bearer ".concat(token)).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage');
        done();
      });
    });
  });
  it('Should not create user admin if email exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(userLogin).then(function (loginResponse) {
      var token = loginResponse.body.token;

      _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user3).set('Authorization', "bearer ".concat(token)).end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage', 'Email already exist!');
        done();
      });
    });
  });
  it('Should not create user admin if password is not strong', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(userLogin).then(function (loginResponse) {
      var token = loginResponse.body.token;

      _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user4).set('Authorization', "bearer ".concat(token)).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage', 'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character');
        done();
      });
    });
  });
  it('Should not create user admin if user not allowed!', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user).set('Authorization', "bearer ".concat(falseToken)).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.be.a('object');
      res.body.should.have.property('errorMessage', 'You are not allowed for this action!');
      done();
    });
  });
  it('Should not create user admin if user not logged In!', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/admin').send(user).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.be.a('object');
      res.body.should.have.property('errorMessage', 'Failed to Authenticate');
      done();
    });
  });
});