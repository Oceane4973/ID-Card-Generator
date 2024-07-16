import express from 'express';
import dotenv from 'dotenv';
import { router } from './birthPlaceService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

app.use('/api/v1/birthplace', router);

app.listen(port, () => {
    console.log(`Birth place Service is running on port ${port}`);
    console.log(`On localhost, you can click on this link : http://localhost:${port}/api/v1/birthplace/byCountry`);
});

