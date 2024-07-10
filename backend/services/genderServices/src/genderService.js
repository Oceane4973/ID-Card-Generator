require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5004;

app.get('genderService/api/gender', async (req, res) => {
    res.json({ gender : "male"});
});

app.listen(PORT, () => {
    console.log(`Gender Service is running on port ${PORT}`);
});
