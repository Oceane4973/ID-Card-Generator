import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import IdRoutes from '../src/routes/id';

fetchMock.enableMocks();

const app = express();
app.use('/id', IdRoutes);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('IdRoutes', () => {
  it('should return a simple ID', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 'simple-id' }));

    const response = await request(app).get('/id/simple');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 'simple-id' });
  });

  it('should return a complex ID', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 'complex-id' }));

    const response = await request(app).get('/id/complex');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 'complex-id' });
  });

  it('should handle API errors gracefully', async () => {
    fetchMock.mockRejectOnce(new Error('API response was not ok'));

    const response = await request(app).get('/id/simple');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });

  it('should handle complex API errors gracefully', async () => {
    fetchMock.mockRejectOnce(new Error('API response was not ok'));

    const response = await request(app).get('/id/complex');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });
});
