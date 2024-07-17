import express from 'express';
import dotenv from 'dotenv';
import { router } from './ageService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use('/api/v1/age', router);

app.listen(port, () => {
    console.log(`Age Service is running on port ${port}`);
    console.log(`On localhost, you can click on this link : http://localhost:${port}/api/v1/age/random`);
});

