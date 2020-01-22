"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _user = _interopRequireDefault(require("../models/user.db"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-undef */

/* eslint-disable comma-dangle */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the Whole API', function () {
  describe('Testing the whole signup feature and its messages', function () {
    var newUser = {
      id: _user["default"].length + 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'testin',
      password: _authenticate["default"].hashPassword('test'),
      phoneNumber: '0788888888',
      address: 'Test',
      isAdmin: false
    };
    var newUser2 = {
      id: _user["default"].length + 1,
      email: 'test@test.com',
      firstName: 'Testion',
      lastName: 'gidh',
      password: _authenticate["default"].hashPassword('trub'),
      phoneNumber: '0788434537',
      address: 'Gatsata',
      isAdmin: false
    };
    var newUser3 = {
      id: _user["default"].length + 1,
      email: 'ricah',
      firstName: 'ricah',
      lastName: 'rijd',
      password: _authenticate["default"].hashPassword('trub'),
      phoneNumber: '0788434537',
      address: 'Gatsata',
      isAdmin: false
    };
    it('Should create new signup', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'User Created Successfully');
        done();
      });
    });
    it('Should not create user if email exists', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(newUser2).end(function (err, res) {
        res.should.have.status(409);
        res.body.should.have.property('error', 'This Email already exists');
        done();
      });
    });
    it('Should not create the user if there is validation error', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(newUser3).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message', 'Validation Error');
        done();
      });
    });
  });
});