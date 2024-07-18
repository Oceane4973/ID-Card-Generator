import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import NationalityRoutes from '../src/routes/nationality';

fetchMock.enableMocks();

const app = express();
app.use('/nationality', NationalityRoutes);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('NationalityRoutes', () => {
  it('should return nationality by name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      country_id: 'ES',
      nationality: 'Spanish',
      country_name: 'Spain'
    }));

    const response = await request(app).get('/nationality/byName?name=John');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      country_id: 'ES',
      nationality: 'Spanish',
      country_name: 'Spain'
    });
  });

  it('should handle missing name parameter', async () => {
    const response = await request(app).get('/nationality/byName');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name query parameter is required' });
  });

  it('should handle API errors for nationality by name', async () => {
    fetchMock.mockRejectOnce(new Error('API response was not ok'));

    const response = await request(app).get('/nationality/byName?name=John');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });
});
