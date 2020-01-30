/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authenticate';
import pool from '../config/config';
import userQueries from '../models/user.query';

chai.should();
chai.use(chaiHttp);

describe('Testing the admin register  feature with the database', () => {
  const user1 = {
    email: 'testes@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test',
    isAdmin: true
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

  const user = {
    email: 'admin@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('Testing123!'),
    phoneNumber: '(078) 456-7827',
    address: 'Test'
  };

  const user2 = {
    email: 'admintest.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('Testing123!'),
    phoneNumber: '0788888888',
    address: 'Test'
  };

  const user3 = {
    email: 'admin@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('Testing123!'),
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };

  const user4 = {
    email: 'adminn@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: 'test',
    phoneNumber: '(078) 980-9876',
    address: 'Test'
  };

  const userLogin = {
    email: 'testes@test.com',
    password: 'Testing123!'
  };

  const falseToken = auth.generateToken(user3);

  it('Should create the user admin', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(userLogin)
      .then(loginResponse => {
        const { token } = loginResponse.body;
        chai
          .request(app)
          .post('/api/v2/auth/admin')
          .send(user)
          .set('Authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property(
              'message',
              'User admin created successfully!'
            );
            done();
          });
      });
  });

  it('Should not create user admin if there is validation error', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(userLogin)
      .then(loginResponse => {
        const { token } = loginResponse.body;
        chai
          .request(app)
          .post('/api/v2/auth/admin')
          .send(user2)
          .set('Authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('errorMessage');
            done();
          });
      });
  });

  it('Should not create user admin if email exists', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(userLogin)
      .then(loginResponse => {
        const { token } = loginResponse.body;
        chai
          .request(app)
          .post('/api/v2/auth/admin')
          .send(user3)
          .set('Authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property(
              'errorMessage',
              'Email already exist!'
            );
            done();
          });
      });
  });

  it('Should not create user admin if password is not strong', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(userLogin)
      .then(loginResponse => {
        const { token } = loginResponse.body;
        chai
          .request(app)
          .post('/api/v2/auth/admin')
          .send(user4)
          .set('Authorization', `bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property(
              'errorMessage',
              'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character'
            );
            done();
          });
      });
  });

  it('Should not create user admin if user not allowed!', done => {
    chai
      .request(app)
      .post('/api/v2/auth/admin')
      .send(user)
      .set('Authorization', `bearer ${falseToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.be.a('object');
        res.body.should.have.property(
          'errorMessage',
          'You are not allowed for this action!'
        );
        done();
      });
  });

  it('Should not create user admin if user not logged In!', done => {
    chai
      .request(app)
      .post('/api/v2/auth/admin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.be.a('object');
        res.body.should.have.property('errorMessage', 'Failed to Authenticate');
        done();
      });
  });
});
