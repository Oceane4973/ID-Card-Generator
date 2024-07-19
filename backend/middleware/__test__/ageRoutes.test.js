import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import AgeRoutes from '../src/routes/age'; 

fetchMock.enableMocks();

const app = express();
app.use(express.json()); 
app.use('/age', AgeRoutes);

describe('AgeRoutes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GET /age/random', () => {
    it('should return a random age', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ age: 29 }));

      const response = await request(app).get('/age/random');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ age: 29 });
    });

    it('should handle errors', async () => {
      fetchMock.mockReject(new Error('API response was not ok'));

      const response = await request(app).get('/age/random');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'API response was not ok' });
    });
  });

  describe('GET /age/byNameAndOrigin', () => {
    it('should return age by name and origin', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ age: 35 }));

      const response = await request(app)
        .get('/age/byNameAndOrigin')
        .query({ name: 'John', country: 'US' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ age: 35 });
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app).get('/age/byNameAndOrigin').query({ country: 'US' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name query parameter is required' });
    });

    it('should return 400 if country is missing', async () => {
      const response = await request(app).get('/age/byNameAndOrigin').query({ name: 'John' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Country query parameter is required' });
    });

    it('should handle errors', async () => {
      fetchMock.mockReject(new Error('API response was not ok'));

      const response = await request(app)
        .get('/age/byNameAndOrigin')
        .query({ name: 'John', country: 'US' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'API response was not ok' });
    });
  });

  describe('POST /age/range', () => {
    it('should return a random age within the range', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ age: 27 }));

      const response = await request(app)
        .post('/age/range')
        .send({ minAge: 20, maxAge: 30 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ age: 27 });
    });

    it('should return 400 if minAge is missing', async () => {
      const response = await request(app).post('/age/range').send({ maxAge: 30 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Minimum query parameter is required' });
    });

    it('should return 400 if minAge is less than 18', async () => {
      const response = await request(app).post('/age/range').send({ minAge: 17, maxAge: 30 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Minimum can\'t be under 18' });
    });

    it('should return 400 if maxAge is missing', async () => {
      const response = await request(app).post('/age/range').send({ minAge: 20 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Maximum query parameter is required' });
    });

    it('should return 400 if maxAge is more than 95', async () => {
      const response = await request(app).post('/age/range').send({ minAge: 20, maxAge: 96 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Maximum can\'t be over 95' });
    });

    it('should handle errors', async () => {
      fetchMock.mockReject(new Error('API response was not ok'));

      const response = await request(app)
        .post('/age/range')
        .send({ minAge: 20, maxAge: 30 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'API response was not ok' });
    });
  });
});
