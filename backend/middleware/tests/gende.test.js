import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Gender Routes', () => {
  describe('GET /v1/gender/createWithFirstName', () => {
    it('should return the gender for a given firstname', (done) => {
      chai.request(app)
        .get('/v1/gender/createWithFirstName')
        .query({ firstname: 'Jean' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('gender');
          expect(res.body.gender).to.equal('male');
          done();
        });
    });

    it('should return the gender for a given firstname', (done) => {
      chai.request(app)
        .get('/v1/gender/createWithFirstName')
        .query({ firstname: 'Marie' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('gender');
          expect(res.body.gender).to.equal('female');
          done();
        });
    });

    it('should return an error for an invalid firstname', (done) => {
      chai.request(app)
        .get('/v1/gender/createWithFirstName')
        .query({ firstname: 'Unknown' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Invalid firstname');
          done();
        });
    });
  });
});
