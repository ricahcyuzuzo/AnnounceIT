/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../models/user.db';
import auth from '../helpers/authenticate';

chai.should();
chai.use(chaiHttp);

describe('Testing the Whole API', () => {
  describe('Testing the whole signup feature and its messages', () => {
    const newUser = {
      id: users.length + 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'testin',
      password: auth.hashPassword('test'),
      phoneNumber: '0788888888',
      address: 'Test',
      isAdmin: false,
    };

    const newUser2 = {
      id: users.length + 1,
      email: 'test@test.com',
      firstName: 'Testion',
      lastName: 'gidh',
      password: auth.hashPassword('trub'),
      phoneNumber: '0788434537',
      address: 'Gatsata',
      isAdmin: false,
    };

    const newUser3 = {
      id: users.length + 1,
      email: 'ricah',
      firstName: 'ricah',
      lastName: 'rijd',
      password: auth.hashPassword('trub'),
      phoneNumber: '0788434537',
      address: 'Gatsata',
      isAdmin: false,
    };
    it('Should create new signup', (done) => {
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

    it('Should not create user if email exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('error', 'This Email already exists');
          done();
        });
    });

    it('Should not create the user if there is validation error', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message', 'Validation Error');
          done();
        });
    });
  });
});
