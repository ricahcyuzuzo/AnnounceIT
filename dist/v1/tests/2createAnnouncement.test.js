"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _announcement = _interopRequireDefault(require("../models/announcement.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-undef */

/* eslint-disable comma-dangle */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the create Announcement Feature', function () {
  var announcement = {
    id: _announcement["default"].length + 1,
    owner: 1,
    text: 'hskdjhsjdfh shdk jhdf kh sdfj k djasd  dasdj ja sdk asdkj hasdj as k adsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  var announcement1 = {
    id: _announcement["default"].length + 1,
    owner: 6776786,
    text: 'sajkhasd jhakjsd hjasdhjd sj asdj aks djadkadsjads hjadkshaj jkhadsjk hadh',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  var announcement3 = {
    id: _announcement["default"].length + 1,
    owner: 1,
    text: 'ads',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  it('Should create a new Announcement', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/user/announcement').send(announcement).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'Announcement created successfully');
      done();
    });
  });
  it('Should find the owner', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/user/announcement').send(announcement1).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage', 'Owner Not found!');
      done();
    });
  });
  it('Should not create announcement if there is Validation error', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/user/announcement').send(announcement3).end(function (error, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage');
      done();
    });
  });
});