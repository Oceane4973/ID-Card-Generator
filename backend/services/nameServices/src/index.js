import express from 'express'
import dotenv from 'dotenv'
import { router } from './nameService.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5005

app.use('/api/v1/name', router);

app.listen(PORT, () => {
    console.log(`Name Service is running on port ${PORT}`);
    console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/name/random`);
});
