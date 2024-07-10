require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5005;

app.get('nameService/api/names', async (req, res) => {
    res.json({ firstName: "Henry", lastName: "Martin" });
});

app.listen(PORT, () => {
    console.log(`Name Service is running on port ${PORT}`);
});
