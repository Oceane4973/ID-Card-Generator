require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

app.get('/ageService/api/ages', async (req, res) => {
    res.json({ age : 24 });
});

app.listen(PORT, () => {
    console.log(`Age Service is running on port ${PORT}`);
});
