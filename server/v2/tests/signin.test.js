/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import pool from '../config/config';
import userQueries from '../models/user.query';
import auth from '../helpers/authenticate';

chai.should();
chai.use(chaiHttp);

describe('Testing the signin feature with the database', () => {
  const user = {
    email: 'testi@test.com',
    password: 'Testing123!'
  };

  const user3 = {
    email: 'testi@test.com',
    password: 'Teststyts'
  };

  const user4 = {
    email: 'testiinhkk@test.com',
    password: 'Teststyts'
  };

  const user2 = {
    email: 'testitest.com',
    password: 'Testing123!'
  };

  const user1 = {
    email: 'testi@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test',
    isAdmin: 'false'
  };

  before(async () => {
    await pool.query(userQueries.signupQuery, [
      user1.email,
      user1.firstName,
      user1.lastName,
      user1.password,
      user1.phoneNumber,
      user1.address,
      user1.isAdmin
    ]);
  });
  it('Should signin the user', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not login if there is validation error', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.be.a('object');
        done();
      });
  });

  it('Should not login if password is Invalid', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(user3)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.be.a('object');
        res.body.should.have.property(
          'errorMessage',
          'Wrong email or password'
        );
        done();
      });
  });
  it('Should not login if password is Invalid', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(user4)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.be.a('object');
        res.body.should.have.property(
          'errorMessage',
          'Wrong email or password'
        );
        done();
      });
  });
});
