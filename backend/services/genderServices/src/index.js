import express from 'express';
import dotenv from 'dotenv';
import { router } from './genderService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5004;

app.use('/api/v1/gender', router);

app.listen(port, () => {
    console.log(`Gender Service is running on port ${port}`);
    console.log(`On localhost, you can click on this link : http://localhost:${port}/api/v1/gender/byName`);
    console.log(`On localhost, you can click on this link : http://localhost:${port}/api/v1/gender/byNameAndOrigin`);
});