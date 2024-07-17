import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/byName', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://api.genderize.io?name=${name}`);
        const { gender, probability } = response.data;
        const selectedGender = chooseGender(gender, probability);

        res.json({ 'gender':selectedGender });
    } catch (error) {
        console.error('Error recovering gender data :', error.message);
        res.status(500).json({ error: 'Error recovering gender data.' });
    }
});

router.get('/byNameAndOrigin', async (req, res) => {
    const { name, country } = req.query;
    try {
        const response = await axios.get(`https://api.genderize.io?name=${name}&country_id=${country}`);
        const { gender, probability } = response.data;
        const selectedGender = chooseGender(gender, probability);

        res.json({ 'gender':selectedGender });
    } catch (error) {
        console.error('Error recovering gender data :', error.message);
        res.status(500).json({ error: 'Error recovering gender data.' });
    }
});

function chooseGender(gender, probability) {
    if (probability < 0 || probability > 1) {
        throw new Error("The probability must be between 0 and 1.");
    }

    const randomValue = Math.random();
    if (randomValue < probability) {
        return gender;
    } else {
        return gender === "male" ? "female" : "male";
    }
}

export { router };