import request from 'supertest';
import express from 'express';
import fetchMock from "jest-fetch-mock";
import { router, apiURL } from '../src/birthPlaceService.js';

const app = express();
app.use(express.json());
app.use('/', router);
fetchMock.enableMocks();

describe('Birth place API Routes', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('GET /byCountry', () => {
		/*it('should return birthplace', async () => {
            const apiFetch = apiURL + '/v1/geo/countries/FR/places?limit=10&types=CITY&sort=name'
            fetchMock
            .mockIf(apiFetch, async () => {
                return {
                    status: 200,
                    body: JSON.stringify({
                        metadata: {
                            currentOffset: 0,
                            totalCount: 234
                        }
                    })
                }
            });

            const apiFetchComplete = apiFetch + '&offset=0'
            fetchMock
            .mockIf(apiFetchComplete, async () => {
                return {
                    status: 200,
                    body: JSON.stringify({
                        data:[{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},{name:"Paris"},],
                    })
                }
            });

			const response = await request(app)
            .get('/byCountry?country=FR')
            .query();
            console.error(response.error)
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('birthplace', 'Paris');
		});*/

        it('should return an error because there is no country parameter', async () => {
            const response = await request(app)
            .get('/byCountry')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"Country query parameter is required"}');
        });
        it('should return an error because country parameter is empty', async () => {
            const response = await request(app)
            .get('/byCountry?country=')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"Country query parameter is required"}');
        });

        /*it('should throw error', async () => {
            fetch.mockReject(Error("API response was not ok"));
			const response = await request(app)
            .get('/random')
            .query();
			expect(response.error.text).toBe('{"error":"API response was not ok"}');
			expect(response.status).toBe(400);
		});*/
	});
});