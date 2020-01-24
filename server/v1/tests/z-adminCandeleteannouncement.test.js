/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Testing the View an announcement', () => {
  it('Should not delete an announcement if not found', done => {
    chai
      .request(app)
      .delete('/api/v1/admin/announcement/3678')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message', 'Not announcement found!');
      });
    done();
  });

  it('Should delete an announcements', done => {
    chai
      .request(app)
      .delete('/api/v1/admin/announcement/1')
      .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
      });
    done();
  });
});
