/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Testing the View all announcements with specific state', () => {
  it('Should not get any announcement if not found', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcement/hfjdhfjdhfdj')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'No announcements assigned to this status'
        );
      });
    done();
  });

  it('Should get all announcements of a specific status', done => {
    chai
      .request(app)
      .get('/api/v1/user/announcement/pending')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
      });
    done();
  });
});
