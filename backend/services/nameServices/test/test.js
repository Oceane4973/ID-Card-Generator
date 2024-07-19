import request from 'supertest';
import express from 'express';
import fetchMock from "jest-fetch-mock";
import { router, apiURL } from '../src/nameService.js';

const app = express();
app.use(express.json());
app.use('/', router);
fetchMock.enableMocks();

describe('Name API Routes', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('GET /random', () => {
		it('should return name and last name', async () => {
            fetch.mockResponseOnce(JSON.stringify({
                "results":
                [
                    {
                        "name":
                        {
                            first: "John",
                            last: "Doe",
                        }
                    }
                ]
            }));
			const response = await request(app)
            .get('/random')
            .query();

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('firstName', 'John');
            expect(response.body).toHaveProperty('lastName', 'Doe');
		});

        it('should throw error', async () => {
            fetch.mockReject(Error("API response was not ok"));
			const response = await request(app)
            .get('/random')
            .query();
			expect(response.error.text).toBe('{"error":"API response was not ok"}');
			expect(response.status).toBe(400);
		});
	});

	describe('GET /byGender', () => {
		it('should return name and last name - Male version', async () => {
            fetch.mockResponseOnce(JSON.stringify({
                "results":
                [
                    {
                        "name":
                        {
                            first: "John",
                            last: "Doe",
                        }
                    }
                ]
            }));
			const response = await request(app)
            .get('/byGender?gender=male')
            .query();

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('firstName', 'John');
            expect(response.body).toHaveProperty('lastName', 'Doe');
		});
		it('should return name and last name - Female version', async () => {
            fetch.mockResponseOnce(JSON.stringify({
                "results":
                [
                    {
                        "name":
                        {
                            first: "Jane",
                            last: "Darambi",
                        }
                    }
                ]
            }));
			const response = await request(app)
            .get('/byGender?gender=male')
            .query();

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('firstName', 'Jane');
            expect(response.body).toHaveProperty('lastName', 'Darambi');
		});
		it('should return an error because there is no gender parameter', async () => {
			const response = await request(app)
            .get('/byGender')
            .query();

			expect(response.status).toBe(400);
			expect(response.error.text).toBe('{"error":"Gender query parameter is required"}');
		});
		it('should return an error because gender parameter is empty', async () => {
			const response = await request(app)
            .get('/byGender?gender=')
            .query();

			expect(response.status).toBe(400);
			expect(response.error.text).toBe('{"error":"Gender query parameter is required"}');
		});
		it('should return an error because gender parameter isn\'t male or female', async () => {
			const response = await request(app)
            .get('/byGender?gender=otherkind')
            .query();

			expect(response.status).toBe(400);
			expect(response.error.text).toBe('{"error":"Gender must be female or male"}');
		});
		it('should throw error', async () => {
            fetch.mockReject(Error("API response was not ok"));
			const response = await request(app)
            .get('/byGender?gender=female')
            .query();
			expect(response.error.text).toBe('{"error":"API response was not ok"}');
			expect(response.status).toBe(400);
		});
	});
});