/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authenticate';
import users from '../models/user.db';

chai.should();
chai.use(chaiHttp);

describe('Testing the whole signin endpoint', () => {
  const newUser = {
    id: users.length + 1,
    email: 'testion@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };
  const user1 = {
    email: 'test@test.com',
    password: 'test'
  };

  const user2 = {
    email: 'notest@notest.com',
    password: auth.hashPassword('test')
  };

  const user3 = {
    email: 'test@test.com',
    password: auth.hashPassword('hjdhfd')
  };

  const user4 = {
    email: 'test',
    password: auth.hashPassword('test')
  };

  it('Should create new signup', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'User Created Successfully');
        done();
      });
  });

  it('Should Signin a user with an account', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: newUser.email, password: newUser.password })
      .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.should.have.property(
          'message',
          'You are signed in successfully'
        );
        done();
      });
  });

  it('Should check if user exist', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          "Oops, You don't have an account yet, Please sign up"
        );
        done();
      });
  });

  it('Should not Sign In if there is validation error', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user4)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.be.a('object');
        done();
      });
  });

  it('Should not signin a user if Authentication failed', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user3)
      .end((err, res) => {
        res.should.have.status(402);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'SignIn Failed');
        done();
      });
  });
});
