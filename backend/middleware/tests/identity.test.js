import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);


describe('Identity Routes', () => {
  describe('GET /v1/identity/simple', () => {
    it('should return a full profile', (done) => {
      chai.request(app)
        .get('/v1/identity/simple')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('gender');
          expect(res.body).to.have.property('nationality');
          expect(res.body).to.have.property('birthplace');
          expect(res.body).to.have.property('age');
          expect(res.body).to.have.property('faceImage');
          expect(res.body.id).to.equal('uuid-v4-string');
          expect(res.body.firstName).to.equal('Jean');
          expect(res.body.lastName).to.equal('Dupont');
          expect(res.body.gender).to.equal('male');
          expect(res.body.nationality).to.equal('French');
          expect(res.body.birthplace).to.equal('Paris');
          expect(res.body.age).to.equal(29);
          expect(res.body.faceImage).to.equal('/9j/4AAQSkZJRgABAQEAAAAAAAD...');
          done();
        });
    });
  });

  describe('GET /v1/identity/createdWithName', () => {
    it('should return a full profile based on name', (done) => {
      chai.request(app)
        .get('/v1/identity/createdWithName')
        .query({ firstname: 'Jean' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('gender');
          expect(res.body).to.have.property('nationality');
          expect(res.body).to.have.property('birthplace');
          expect(res.body).to.have.property('age');
          expect(res.body).to.have.property('faceImage');
          expect(res.body.id).to.equal('uuid-v4-string');
          expect(res.body.firstName).to.equal('Jean');
          expect(res.body.lastName).to.equal('Dupont');
          expect(res.body.gender).to.equal('male');
          expect(res.body.nationality).to.equal('French');
          expect(res.body.birthplace).to.equal('Paris');
          expect(res.body.age).to.equal(29);
          expect(res.body.faceImage).to.equal('/9j/4AAQSkZJRgABAQEAAAAAAAD...');
          done();
        });
    });
  });

  describe('GET /v1/identity/createdWithNationality', () => {
    it('should return a full profile based on nationality', (done) => {
      chai.request(app)
        .get('/v1/identity/createdWithNationality')
        .query({ nationality: 'French' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('gender');
          expect(res.body).to.have.property('nationality');
          expect(res.body).to.have.property('birthplace');
          expect(res.body).to.have.property('age');
          expect(res.body).to.have.property('faceImage');
          expect(res.body.id).to.equal('uuid-v4-string');
          expect(res.body.firstName).to.equal('Jean');
          expect(res.body.lastName).to.equal('Dupont');
          expect(res.body.gender).to.equal('male');
          expect(res.body.nationality).to.equal('French');
          expect(res.body.birthplace).to.equal('Paris');
          expect(res.body.age).to.equal(29);
          expect(res.body.faceImage).to.equal('/9j/4AAQSkZJRgABAQEAAAAAAAD...');
          done();
        });
    });
  });
});
