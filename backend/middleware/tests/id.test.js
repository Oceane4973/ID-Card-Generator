import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('ID Routes', () => {
  describe('GET /v1/id/simple', () => {
    it('should return a simple ID', (done) => {
      chai.request(app)
        .get('/v1/id/simple')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body.id).to.equal('AZDFVBGNH');
          done();
        });
    });
  });

  describe('GET /v1/id/complex', () => {
    it('should return a complex ID', (done) => {
      chai.request(app)
        .get('/v1/id/complex')
        .query({ length: 10, type: 'alphanumeric' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body.id).to.equal('AZDFVBGNH');
          done();
        });
    });
  });
});
