/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Testing the View an announcement', () => {
  it('Should not get an announcement if not found', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcement/3678')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'Announcement not found!');
      });
    done();
  });

  it('Should get an announcements', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcement/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
      });
    done();
  });
});
