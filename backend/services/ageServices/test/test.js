import request from 'supertest';
import express from 'express';
import fetchMock from "jest-fetch-mock";
import { router, apiURL } from '../src/ageService.js';

const app = express();
app.use(express.json());
app.use('/', router);
fetchMock.enableMocks();

describe('Age API Routes', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('GET /random', () => {
        it('should return a value greater or equal to 18 and lesser or equal to 85', async () => {
            const response = await request(app)
            .get('/random')
            .query();

            expect(response.status).toBe(200);
            expect(response.body.age).toBeGreaterThanOrEqual(18);
            expect(response.body.age).toBeLessThanOrEqual(85);
        });
    });

    describe('GET /byNameAndOrigin', () => {
        it('should return a value over or equal to 60 and under or equal to 70', async () => {
            const name = 'Jacques-Yves';
            const country = 'FR';
            const age = 65;
            const apiFetch = apiURL + '?name=' + name + '&country_id=' + country
            fetchMock
            .mockIf(apiFetch, async () => {
                return {
                    status: 200,
                    body: JSON.stringify({
                        age: 65
                    })
                }
            });
            const response = await request(app)
            .get('/byNameAndOrigin?name=' + name + '&country=' + country)
            .query();

            expect(response.status).toBe(200);
            expect(response.body.age).toBeGreaterThanOrEqual(65 - 5);
            expect(response.body.age).toBeLessThanOrEqual(65 + 5);
            
        });

        it('should return an error because there are not any parameters', async () => {
            const response = await request(app)
            .get('/byNameAndOrigin')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"Name query parameter is required"}');
        });

        it('should return an error because name is empty', async () => {
            const response = await request(app)
            .get('/byNameAndOrigin?name=')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"Name query parameter is required"}');
        });

        it('should return an error because country is empty', async () => {
            const response = await request(app)
            .get('/byNameAndOrigin?name=Ryan&country=')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"Country query parameter is required"}');
        });
	});

    describe('GET /range', () => {
        it('should return a value greater than or equal to minAge and lesser than or equal to maxAge', async () => {
            const minAge = 36;
            const maxAge = 50;
            const response = await request(app)
            .get('/range?minAge=' + minAge + '&maxAge=' + maxAge)
            .query();

            expect(response.status).toBe(200);
            expect(response.body.age).toBeGreaterThanOrEqual(minAge);
            expect(response.body.age).toBeLessThanOrEqual(maxAge);
        });

        it('should return an error because there are not any parameters', async () => {
            const response = await request(app)
            .get('/range')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"minAge query parameter is required"}');
        });

        describe('(minAge query parameter tests)', () => {
            it('should return an error because minAge is empty', async () => {
                const response = await request(app)
                .get('/range?minAge=')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"minAge query parameter is required"}');
            });
            it('should return an error because minAge is under 18', async () => {
                const response = await request(app)
                .get('/range?minAge=17')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"minAge can not be under 18 or over 85"}');
            });
            it('should return an error because minAge is over 85', async () => {
                const response = await request(app)
                .get('/range?minAge=87')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"minAge can not be under 18 or over 85"}');
            });
        });

        describe('(maxAge query parameter tests)', () => {
            it('should return an error because maxAge is empty', async () => {
                const response = await request(app)
                .get('/range?minAge=20&maxAge=')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"maxAge query parameter is required"}');
            });
            it('should return an error because maxAge is under 18', async () => {
                const response = await request(app)
                .get('/range?minAge=20&maxAge=17')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"maxAge can not be over 85 or under 18"}');
            });
            it('should return an error because maxAge is over 85', async () => {
                const response = await request(app)
                .get('/range?minAge=27&maxAge=87')
                .query();

                expect(response.status).toBe(400);
                expect(response.error.text).toBe('{"error":"maxAge can not be over 85 or under 18"}');
            });
        });

        it('should return an error because minAge is above maxAge', async () => {
            const response = await request(app)
            .get('/range?minAge=50&maxAge=36')
            .query();

            expect(response.status).toBe(400);
            expect(response.error.text).toBe('{"error":"maxAge can not be under minAge and vice versa !"}');
        });
	});
});