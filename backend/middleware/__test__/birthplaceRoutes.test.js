import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import BirthplaceRoutes from '../src/routes/birthplace';

const app = express();
app.use('/birthplace', BirthplaceRoutes);

describe('BirthplaceRoutes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return birthplace when country is valid', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ birthPlace: 'Paris' }));

    const response = await request(app).get('/birthplace/byCountry?country=France');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ birthplace: 'Paris' });
  });

  it('should return 400 if country parameter is missing', async () => {
    const response = await request(app).get('/birthplace/byCountry');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Country query parameter is required' });
  });

  it('should return error if country does not exist', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    const response = await request(app).get('/birthplace/byCountry?country=UnknownCountry');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "This country doesn't exist !" });
  });

  it('should return error if API response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    const response = await request(app).get('/birthplace/byCountry?country=France');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'API response was not ok' });
  });

  it('should return error if response structure is invalid', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ wrongKey: 'Paris' }));

    const response = await request(app).get('/birthplace/byCountry?country=France');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Invalid response structure' });
  });
});
