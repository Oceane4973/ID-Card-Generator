require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5007;

app.get('/uniqueIDService/api/id', async (req, res) => {
    res.json({ id: "XMD8GKGBCEZR"});
});

app.listen(PORT, () => {
    console.log(`ID Service is running on port ${PORT}`);
    console.log(`On localhost, you can click on this link : http://localhost:${PORT}/uniqueIDService/api/id`);
});
