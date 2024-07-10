require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5002;

app.get('/birthPlaceService/api/birthPlace', async (req, res) => {
    res.json({ birthPlace : "Aix-en-Provence"});
});

app.listen(PORT, () => {
    console.log(`birth Place Service is running on port ${PORT}`);
});
