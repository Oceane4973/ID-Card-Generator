require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5006;

app.get('nationalityService/api/names', async (req, res) => {
    res.json({ nationnality : "France"});
});

app.listen(PORT, () => {
    console.log(`Name Service is running on port ${PORT}`);
});
