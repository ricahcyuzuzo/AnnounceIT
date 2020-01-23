/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../models/user.db';
import announcements from '../models/announcement.db';
import auth from '../helpers/authenticate';

chai.should();
chai.use(chaiHttp);

describe('Testing the create Announcement Feature', () => {
  const newUser = {
    id: users.length + 1,
    email: 'testion@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };

  const announcement = {
    id: announcements.length + 1,
    owner: 1,
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };

  const announcement1 = {
    id: announcements.length + 1,
    owner: 1,
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  const announcement3 = {
    id: announcements.length + 1,
    owner: 2323,
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };

  it('Should create a new Announcement', done => {
    chai
      .request(app)
      .post('/api/v1/user/createAnnouncement')
      .send(announcement)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'Announcement created successfully'
        );
        done();
      });
  });
  it('Should find the owner', done => {
    chai
      .request(app)
      .post('/api/v1/user/createAnnouncement')
      .send(announcement1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage', 'Owner Not Found!');
        done();
      });
  });
  it('Should not create announcement if there is Validation error', done => {
    chai
      .request(app)
      .post('/api/v1/user/createAnnouncement')
      .send(announcement3)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errorMessage');
        done();
      });
  });
});
