import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Face Routes', () => {
  describe('GET /v1/face/createWithGenderAndAge', () => {
    it('should return a face image based on gender and age', (done) => {
      chai.request(app)
        .get('/v1/face/createWithGenderAndAge')
        .query({ gender: 'male', age: 30 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('image-b64');
          expect(res.body['image-b64']).to.equal('/9j/4AAQSkZJRgABAQEAAAAAAAD...');
          done();
        });
    });
  });
});
