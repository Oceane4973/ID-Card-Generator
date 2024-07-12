require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5006;

app.get('/nationalityService/api/nationality', async (req, res) => {
    res.json({ nationnality : "France"});
});

app.listen(PORT, () => {
    console.log(`Nationality Service is running on port ${PORT}`);
    console.log(`On localhost, you can click on this link : http://localhost:${PORT}/nationalityService/api/nationality`);
});
