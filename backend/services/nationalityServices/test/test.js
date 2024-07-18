import request from 'supertest';
import express from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { router } from '../src/nationalityService.js';

const app = express();
app.use(express.json());
app.use('/', router);

const mock = new MockAdapter(axios);

describe('GET /ByName', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should return 400 if name query parameter is missing', async () => {
        const response = await request(app).get('/ByName');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Name query parameter is required');
    });

    it('should return country data when name is provided', async () => {
        const mockResponse = {
            country: [
                { country_id: 'FR', probability: 1.0 },
            ]
        };
        const mockCountryData = [{
            demonyms: {
                eng: {
                    m: 'French'
                }
            }
        }];

        mock.onGet('https://api.nationalize.io?name=Jean-Eude').reply(200, mockResponse);
        mock.onGet('https://restcountries.com/v3.1/alpha/FR').reply(200, mockCountryData);

        const response = await request(app).get('/ByName?name=Jean-Eude');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('country_id', 'FR');
        expect(response.body).toHaveProperty('nationality', 'French');
        expect(response.body).toHaveProperty('country_name', 'France');
    });

    it('should return 500 if there is an error fetching data from Nationalize API', async () => {
        mock.onGet('https://api.nationalize.io?name=Jean-Eude').reply(500);

        const response = await request(app).get('/ByName?name=Jean-Eude');
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error fetching data from Nationalize API');
    });

    it('should return "Invalid ISO Code" if country code is invalid', async () => {
        const mockResponse = {
            country: [
                { country_id: 'XX', probability: 1.0 }
            ]
        };

        mock.onGet('https://api.nationalize.io?name=Jean-Eude').reply(200, mockResponse);
        mock.onGet('https://restcountries.com/v3.1/alpha/XX').reply(404);

        const response = await request(app).get('/ByName?name=Jean-Eude');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('country_id', 'XX');
        expect(response.body).toHaveProperty('nationality', 'Error fetching data');
        expect(response.body).toHaveProperty('country_name', 'Invalid ISO Code');
    });
});