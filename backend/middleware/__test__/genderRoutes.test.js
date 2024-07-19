import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import GenderRoutes from '../src/routes/gender';

fetchMock.enableMocks();

const app = express();
app.use('/gender', GenderRoutes);

describe('GenderRoutes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GET /gender/byName', () => {
    it('should return 400 if name is not provided', async () => {
      const response = await request(app).get('/gender/byName');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name query parameter is required' });
    });

    it('should return gender data for a valid name', async () => {
      const mockResponse = { gender: 'male' };
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const response = await request(app).get('/gender/byName').query({ name: 'John' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it('should return 500 if API response is not ok', async () => {
      fetchMock.mockResponseOnce(null, { status: 500 });

      const response = await request(app).get('/gender/byName').query({ name: 'John' });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'API response was not ok' });
    });
  });

  describe('GET /gender/byNameAndOrigin', () => {
    it('should return 400 if name is not provided', async () => {
      const response = await request(app).get('/gender/byNameAndOrigin').query({ country: 'US' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name query parameter is required' });
    });

    it('should return 400 if country is not provided', async () => {
      const response = await request(app).get('/gender/byNameAndOrigin').query({ name: 'John' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Country query parameter is required' });
    });

    it('should return gender data for a valid name and country', async () => {
      const mockResponse = { gender: 'male' };
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const response = await request(app).get('/gender/byNameAndOrigin').query({ name: 'John', country: 'US' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it('should return 500 if API response is not ok', async () => {
      fetchMock.mockResponseOnce(null, { status: 500 });

      const response = await request(app).get('/gender/byNameAndOrigin').query({ name: 'John', country: 'US' });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error recovering gender data.' });
    });
  });
});