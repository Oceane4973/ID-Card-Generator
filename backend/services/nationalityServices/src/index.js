import express from 'express';
import dotenv from 'dotenv';
import { router } from './nationalityService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5006;

app.use('/api/v1/nationality', router);

app.listen(port, () => {
    console.log(`Nationality Service is running on port ${port}`);
    console.log(`On localhost, you can click on this link : http://localhost:${port}/api/v1/nationality/ByName`);
});

