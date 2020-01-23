/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Testing the admin features', () => {
  it('Should get all announcements', done => {
    chai
      .request(app)
      .get('/api/v1/admin/announcement/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
      });
    done();
  });
});
