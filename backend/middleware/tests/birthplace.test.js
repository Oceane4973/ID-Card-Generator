import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Birthplace Routes', () => {
  describe('GET /v1/birthplace/createWithCountry', () => {
    it('should return the birthplace for a given country', (done) => {
      chai.request(app)
        .get('/v1/birthplace/createWithCountry')
        .query({ country: 'France' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('birthplace');
          expect(res.body.birthplace).to.equal('Paris');
          done();
        });
    });
  });
});
