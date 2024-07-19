import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import NameRoutes from '../src/routes/name';

fetchMock.enableMocks();

const app = express();
app.use('/name', NameRoutes);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('NameRoutes', () => {
  it('should return a random name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ firstName: 'Beatriz', lastName: 'Urías' }));

    const response = await request(app).get('/name/random');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ firstName: 'Beatriz', lastName: 'Urías' });
  });

  it('should return a name by gender', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ firstName: 'Beatriz', lastName: 'Urías' }));

    const response = await request(app).get('/name/byGender?name=John&gender=male');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ firstName: 'Beatriz', lastName: 'Urías' });
  });

  it('should handle missing name parameter', async () => {
    const response = await request(app).get('/name/byGender?gender=male');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name query parameter is required' });
  });

  it('should handle missing gender parameter', async () => {
    const response = await request(app).get('/name/byGender?name=John');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Gender query parameter is required' });
  });

  it('should handle API errors for random name', async () => {
    fetchMock.mockRejectOnce(new Error('API response was not ok'));

    const response = await request(app).get('/name/random');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });

  it('should handle API errors for name by gender', async () => {
    fetchMock.mockRejectOnce(new Error('API response was not ok'));

    const response = await request(app).get('/name/byGender?name=John&gender=male');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });
});
