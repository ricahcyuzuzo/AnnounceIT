"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable arrow-parens */

/* eslint-disable no-undef */

/* eslint-disable comma-dangle */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Update an announcement', function () {
  var announcement = {
    owner: 1,
    status: 'active',
    text: 'hskdjhsjdfh shdk jhdf kh sdfj k djasd  dasdj ja sdk asdkj hasdj as k adsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  var announcement1 = {
    id: 2,
    owner: 1,
    status: 'active',
    text: 'hskdjhsjdfh shdk jhdf kh sdfj k djasd  dasdj ja sdk asdkj hasdj as k adsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  var announcement2 = {
    id: 1,
    owner: 1,
    status: 'active',
    text: 'dsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  it('Should not update announcement status if there is Validation error', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/admin/announcement/1').send(announcement2).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage');
      done();
    });
  });
  it('Should find the announcement if exists', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/admin/announcement/1231').send(announcement1).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('errorMessage', 'Announcement Not Found!');
      done();
    });
  });
  it('Should update the announcement status', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/user/announcement/1').send(announcement).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'Announcement Updated!');
      done();
    });
  });
});