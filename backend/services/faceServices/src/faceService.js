require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5004;

app.get('/faceService/api/names', async (req, res) => {
    res.json({ image : "b64???" });
});

app.listen(PORT, () => {
    console.log(`Face Service is running on port ${PORT}`);
});
