import request from 'supertest';
import express from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { router } from '../src/nationalityService.js';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Nationality API Routes', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    describe('GET /ByName', () => {
        it('should return country_id, nationality, and country_name', async () => {
            mock.onGet('https://api.nationalize.io?name=John').reply(200, {
                country: [{ country_id: 'US', probability: 0.99 }]
            });
            mock.onGet('https://restcountries.com/v3.1/alpha/US').reply(200, [
                {
                    demonyms: { eng: { m: 'American' } }
                }
            ]);

            const response = await request(app)
                .get('/ByName')
                .query({ name: 'John' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('country_id', 'US');
            expect(response.body).toHaveProperty('nationality', 'American');
            expect(response.body).toHaveProperty('country_name', 'United States of America');
        });

        it('should handle errors gracefully', async () => {
            mock.onGet('https://api.nationalize.io?name=John').networkError();

            const response = await request(app)
                .get('/ByName')
                .query({ name: 'John' });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Error fetching data from Nationalize API');
        });
    });
});
