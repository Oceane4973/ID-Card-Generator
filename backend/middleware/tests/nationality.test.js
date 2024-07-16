import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);


describe('Nationality Routes', () => {
  describe('GET /v1/nationality/createWithFirstName', () => {
    it('should return the nationality for a given firstname', (done) => {
      chai.request(app)
        .get('/v1/nationality/createWithFirstName')
        .query({ firstname: 'Jean' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('nationality');
          expect(res.body.nationality).to.equal('French');
          done();
        });
    });
  });
});
