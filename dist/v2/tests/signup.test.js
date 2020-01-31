"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-undef */

/* eslint-disable comma-dangle */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the signup feature with the database', function () {
  var user = {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '(078) 456-7827',
    address: 'Test'
  };
  var user2 = {
    email: 'testtest.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test'
  };
  var user3 = {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: _authenticate["default"].hashPassword('Testing123!'),
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };
  var user4 = {
    email: 'testing@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: 'test',
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };
  it('Should create the user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'User created successfully!');
      done();
    });
  });
  it('Should not create user if there is validation error', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user2).end(function (err, res) {
      res.should.have.status(400);
      res.should.have.be.a('object');
      done();
    });
  });
  it('Should not create user if email exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user3).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.have.be.a('object');
      res.body.should.have.property('errorMessage', 'Email already exist!');
      done();
    });
  });
  it('Should not create user if password is not strong', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v2/auth/signup').send(user4).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.be.a('object');
      res.body.should.have.property('errorMessage');
      done();
    });
  });
});