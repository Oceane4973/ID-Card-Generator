import request from 'supertest';
import express from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { router } from '../src/genderService'; // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());
app.use('/', router);

describe('Gender Service', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('GET /byName', () => {
        it('should return gender for a given name', async () => {
            mock.onGet(/genderize.io/).reply(200, { gender: 'male', probability: 0.99 });

            const res = await request(app).get('/byName').query({ name: 'John' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('gender', 'male');
        });

        it('should return 400 if name is missing', async () => {
            const res = await request(app).get('/byName');

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'Name parameter is required.');
        });

        it('should return 429 on too many requests', async () => {
            mock.onGet(/genderize.io/).reply(429);

            const res = await request(app).get('/byName').query({ name: 'John' });

            expect(res.status).toBe(429);
            expect(res.body).toHaveProperty('error', 'Too Many Requests. Please try again later.');
        });

        it('should return 500 on other errors', async () => {
            mock.onGet(/genderize.io/).reply(500);

            const res = await request(app).get('/byName').query({ name: 'John' });

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('error', 'Error recovering gender data.');
        });
    });

    describe('GET /byNameAndOrigin', () => {
        it('should return gender for a given name and country', async () => {
            mock.onGet(/genderize.io/).reply(200, { gender: 'female', probability: 0.85 });

            const res = await request(app).get('/byNameAndOrigin').query({ name: 'Anna', country: 'PL' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('gender', 'female');
        });

        it('should return 400 if name or country is missing', async () => {
            const res = await request(app).get('/byNameAndOrigin').query({ name: 'Anna' });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'Name and country parameters are required.');
        });

        it('should return 429 on too many requests', async () => {
            mock.onGet(/genderize.io/).reply(429);

            const res = await request(app).get('/byNameAndOrigin').query({ name: 'Anna', country: 'PL' });

            expect(res.status).toBe(429);
            expect(res.body).toHaveProperty('error', 'Too Many Requests. Please try again later.');
        });

        it('should return 500 on other errors', async () => {
            mock.onGet(/genderize.io/).reply(500);

            const res = await request(app).get('/byNameAndOrigin').query({ name: 'Anna', country: 'PL' });

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('error', 'Error recovering gender data.');
        });
    });
});