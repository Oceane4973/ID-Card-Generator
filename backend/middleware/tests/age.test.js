import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);

describe('Age Routes', () => {
  describe('GET /v1/age/random', () => {
    it('should return a random age', (done) => {
      chai.request(app)
        .get('/v1/age/random')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('age');
          expect(res.body.age).to.equal(29);
          done();
        });
    });
  });

  describe('GET /v1/age/createWithNameAndOrigin', () => {
    it('should return an age based on name and origin', (done) => {
      chai.request(app)
        .get('/v1/age/createWithNameAndOrigin')
        .query({ firstname: 'Jean', country: 'France' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('age');
          expect(res.body.age).to.equal(35);
          done();
        });
    });
  });

  describe('GET /v1/age/range', () => {
    it('should return an age within the specified range', (done) => {
      chai.request(app)
        .get('/v1/age/range')
        .query({ minAge: 20, maxAge: 40 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('age');
          expect(res.body.age).to.equal(27);
          done();
        });
    });
  });
});
