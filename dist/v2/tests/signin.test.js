"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _config = _interopRequireDefault(require("../config/config"));

var _user = _interopRequireDefault(require("../models/user.query"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the signin feature with the database', function () {
  var user = {
    email: 'testi@test.com',
    password: 'Testing123!'
  };
  var user3 = {
    email: 'testi@test.com',
    password: 'Teststyts'
  };
  var user4 = {
    email: 'testiinhkk@test.com',
    password: 'Teststyts'
  };
  var user2 = {
    email: 'testitest.com',
    password: 'Testing123!'
  };
  var user1 = {
    email: 'testi@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test',
    isAdmin: 'false'
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
  it('Should signin the user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(user).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  it('Should not login if there is validation error', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(user2).end(function (err, res) {
      res.should.have.status(400);
      res.should.have.be.a('object');
      done();
    });
  });
  it('Should not login if password is Invalid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(user3).end(function (err, res) {
      res.should.have.status(401);
      res.should.have.be.a('object');
      res.body.should.have.property('errorMessage', 'Wrong email or password');
      done();
    });
  });
  it('Should not login if password is Invalid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signin').send(user4).end(function (err, res) {
      res.should.have.status(404);
      res.should.have.be.a('object');
      res.body.should.have.property('errorMessage', 'Wrong email or password');
      done();
    });
  });
});