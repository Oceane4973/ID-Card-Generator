import request from 'supertest';
import express from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { router } from '../src/genderService.js';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Genderize API Routes', () => {
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

	describe('GET /byName', () => {
		it('should return gender and selectedGender when probability is high', async () => {
			mock.onGet('https://api.genderize.io?name=John').reply(200, {
				gender: 'male',
				probability: 1,
			});

			const response = await request(app)
				.get('/byName')
				.query({ name: 'John' });

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('gender', 'male');
		});

		it('should handle errors gracefully', async () => {
			mock.onGet('https://api.genderize.io?name=John').networkError();

			const response = await request(app)
				.get('/byName')
				.query({ name: 'John' });

			expect(response.status).toBe(500);
			expect(response.body).toHaveProperty(
				'error',
				'Error recovering gender data.'
			);
		});
	});

	describe('GET /byNameAndOrigin', () => {
		it('should return gender and selectedGender with country', async () => {
			mock.onGet(
				'https://api.genderize.io?name=John&country_id=US'
			).reply(200, {
				gender: 'male',
				probability: 1,
			});

			const response = await request(app)
				.get('/byNameAndOrigin')
				.query({ name: 'John', country: 'US' });

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('gender', 'male');
		});

		it('should handle errors gracefully', async () => {
			mock.onGet(
				'https://api.genderize.io?name=John&country_id=US'
			).networkError();

			const response = await request(app)
				.get('/byNameAndOrigin')
				.query({ name: 'John', country: 'US' });

			expect(response.status).toBe(500);
			expect(response.body).toHaveProperty(
				'error',
				'Error recovering gender data.'
			);
		});
	});
});