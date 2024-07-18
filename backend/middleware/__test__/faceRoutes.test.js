import express from 'express';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import FaceRoutes from '../src/routes/birthplace';

const app = express();
app.use('/face', FaceRoutes);

describe('FaceRoutes', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('empty tests', async () => {})

    /**
    it('should return an image when called with valid gender and age', async () => {
        const mockImage = Buffer.from('mock image data');
        
        fetchMock.mockResponseOnce(() => Promise.resolve(new Response(mockImage, {
            headers: { 'Content-Type': 'image/jpeg' }
        })));

        const response = await request(app).get('/face/byGenderAndAge').query({ gender: 'male', age: 30 });

        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('image/jpeg');
        expect(response.body).toEqual(mockImage);
    });

    it('should return a 500 error when fetch fails', async () => {
        fetchMock.mockReject(new Error('Fetch failed'));

        const response = await request(app).get('/face/byGenderAndAge').query({ gender: 'male', age: 30 });

        expect(response.status).toBe(500);
        expect(response.text).toContain('Error: Fetch failed');
    });

    it('should return a 500 error when response is not ok', async () => {
        fetchMock.mockResponseOnce(() => Promise.resolve(new Response('Failed to retrieve image', { status: 500 })));

        const response = await request(app).get('/face/byGenderAndAge').query({ gender: 'male', age: 30 });

        expect(response.status).toBe(500);
        expect(response.text).toContain('Failed to retrieve image');
    });
    **/
});
