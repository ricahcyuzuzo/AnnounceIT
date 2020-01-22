"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

var _user = _interopRequireDefault(require("../models/user.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-undef */

/* eslint-disable comma-dangle */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the whole signin endpoint', function () {
  var newUser = {
    id: _user["default"].length + 1,
    email: 'testion@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };
  var user1 = {
    email: 'test@test.com',
    password: 'test'
  };
  var user2 = {
    email: 'notest@notest.com',
    password: _authenticate["default"].hashPassword('test')
  };
  var user3 = {
    email: 'test@test.com',
    password: _authenticate["default"].hashPassword('hjdhfd')
  };
  var user4 = {
    email: 'test',
    password: _authenticate["default"].hashPassword('test')
  };
  it('Should create new signup', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'User Created Successfully');
      done();
    });
  });
  it('Should Signin a user with an account', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: newUser.email,
      password: newUser.password
    }).end(function (err, res) {
      res.should.have.status(202);
      res.body.should.be.a('object');
      res.body.should.have.property('token');
      res.body.should.have.property('message', 'You are signed in successfully');
      done();
    });
  });
  it('Should check if user exist', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user2).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message', "Oops, You don't have an account yet, Please sign up");
      done();
    });
  });
  it('Should not Sign In if there is validation error', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user4).end(function (err, res) {
      res.should.have.status(400);
      res.should.have.be.a('object');
      done();
    });
  });
  it('Should not signin a user if Authentication failed', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user3).end(function (err, res) {
      res.should.have.status(402);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'SignIn Failed');
      done();
    });
  });
});