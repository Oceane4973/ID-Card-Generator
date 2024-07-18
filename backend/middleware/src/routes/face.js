import express from 'express';
import fetch from 'node-fetch';
import { PassThrough } from 'stream';

class FaceRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/byGenderAndAge', this.generateFaceByGenderAndAge.bind(this));
    }

    async generateFaceByGenderAndAge(req, res) {
        const { gender, age } = req.query;

        try {
            const response = await fetch(
                `http://localhost:5003/api/v1/face/byGenderAndAge?age=${age}&gender=${gender}`
            );

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                res.set('Content-Type', contentType);

                const bodyStream = new PassThrough();
                response.body.pipe(bodyStream);
                bodyStream.pipe(res);
            } else {
                const errorText = await response.text();
                res.status(500).send(`Failed to retrieve image: ${errorText}`);
            }
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
}

export default new FaceRoutes().router;
