/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Testing the View all his/her announcement', () => {
  it('Should not get any announcement', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcements/98789')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'You have not yet any announcement!'
        );
      });
    done();
  });

  it('Should get all announcements of a user', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcements/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'Here are all your announcemts'
        );
      });
    done();
  });
});
