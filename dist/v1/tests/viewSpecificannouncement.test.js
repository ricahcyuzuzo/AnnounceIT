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

describe('Testing the View an announcement', function () {
  it('Should not get an announcement if not found', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/user/announcement/3678').end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message', 'Announcement not found!');
    });

    done();
  });
  it('Should get an announcements', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/user/announcement/1').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });

    done();
  });
});