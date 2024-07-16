import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Name Routes', () => {
  describe('GET /v1/name/random', () => {
    it('should return a random name', (done) => {
      chai.request(app)
        .get('/v1/name/random')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body.firstName).to.equal('Jean');
          expect(res.body.lastName).to.equal('Dupont');
          done();
        });
    });
  });

  describe('GET /v1/name/createWithGender', () => {
    it('should return a name for male gender', (done) => {
      chai.request(app)
        .get('/v1/name/createWithGender')
        .query({ gender: 'male' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body.firstName).to.equal('Jean');
          expect(res.body.lastName).to.equal('Dupont');
          done();
        });
    });

    it('should return a name for female gender', (done) => {
      chai.request(app)
        .get('/v1/name/createWithGender')
        .query({ gender: 'female' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body.firstName).to.equal('Marie');
          expect(res.body.lastName).to.equal('Curie');
          done();
        });
    });

    it('should return an error for invalid gender', (done) => {
      chai.request(app)
        .get('/v1/name/createWithGender')
        .query({ gender: 'invalid' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Invalid gender');
          done();
        });
    });
  });
});
