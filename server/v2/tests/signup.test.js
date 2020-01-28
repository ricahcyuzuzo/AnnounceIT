/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authenticate';

chai.should();
chai.use(chaiHttp);

describe('Testing the signup feature with the database', () => {
  const user = {
    id: 1,
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };

  const user2 = {
    id: 2,
    email: 'testtest.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };

  const user3 = {
    id: 2,
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'testin',
    password: auth.hashPassword('test'),
    phoneNumber: '0788888888',
    address: 'Test'
  };

  it('Should create the user', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'User created successfully!');
        done();
      });
  });

  it('Should not create user if there is validation error', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.be.a('object');
        done();
      });
  });

  it('Should not create user if email exists', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user3)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.be.a('object');
        res.body.should.have.property('errorMessage', 'Email already exist!');
        done();
      });
  });
});
