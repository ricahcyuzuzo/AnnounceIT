/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Update an announcement', () => {
  const announcement = {
    id: 1,
    owner: 1,
    text:
      'hskdjhsjdfh shdk jhdf kh sdfj k djasd  dasdj ja sdk asdkj hasdj as k adsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };

  const announcement1 = {
    id: 2,
    owner: 1,
    text:
      'hskdjhsjdfh shdk jhdf kh sdfj k djasd  dasdj ja sdk asdkj hasdj as k adsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };

  const announcement2 = {
    id: 1,
    owner: 1,
    text: 'dsj',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };

  it('Should not update announcement if there is Validation error', done => {
    chai
      .request(app)
      .patch('/api/v1/user/updateAnnouncement')
      .send(announcement2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage');
        done();
      });
  });

  it('Should find the announcement to update', done => {
    chai
      .request(app)
      .patch('/api/v1/user/updateAnnouncement')
      .send(announcement1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'errorMessage',
          'Announcement Not Found!'
        );
        done();
      });
  });
  it('Should check if announcement exists', done => {
    chai
      .request(app)
      .patch('/api/v1/user/updateAnnouncement')
      .send(announcement)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'Announcement Updated!');
        done();
      });
  });
});
