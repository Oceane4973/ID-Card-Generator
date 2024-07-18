import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/byName', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name parameter is required.' });
    }

    try {
        const response = await axios.get(`https://api.genderize.io?name=${name}`);
        const { gender, probability } = response.data;
        const selectedGender = chooseGender(gender, probability);

        res.json({ 'gender': selectedGender });
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Too Many Requests:', error.message);
            res.status(429).json({ error: 'Too Many Requests. Please try again later.' });
        } else {
            console.error('Error recovering gender data:', error.message);
            res.status(500).json({ error: 'Error recovering gender data.' });
        }
    }
});

router.get('/byNameAndOrigin', async (req, res) => {
    const { name, country } = req.query;
    if (!name || !country) {
        return res.status(400).json({ error: 'Name and country parameters are required.' });
    }

    try {
        const response = await axios.get(`https://api.genderize.io?name=${name}&country_id=${country}`);
        const { gender, probability } = response.data;
        const selectedGender = chooseGender(gender, probability);

        res.json({ 'gender': selectedGender });
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Too Many Requests:', error.message);
            res.status(429).json({ error: 'Too Many Requests. Please try again later.' });
        } else {
            console.error('Error recovering gender data:', error.message);
            res.status(500).json({ error: 'Error recovering gender data.' });
        }
    }
});

function chooseGender(gender, probability) {
    try {
        if (probability < 0 || probability > 1) {
            throw new Error('Invalid probability value.');
        }
        return gender;
    } catch (error) {
        console.error('Error choosing gender:', error.message);
        return null;
    }
}

export { router };
