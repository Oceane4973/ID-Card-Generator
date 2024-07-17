import express from 'express'
const apiURL = "https://api.agify.io/";

const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 85;
const PLUSMINUS = 3;

const router = express.Router();

router.get('/random', async (req, res) => {
    const value = Math.floor(Math.random() * (MAXIMUM_AGE - MINIMUM_AGE)) + MINIMUM_AGE;
    res.send(apiResponseConstructor(value));
});

router.get('/byNameAndOrigin', async (req, res) => {
    if(!req.query.name) {
        return res
            .status(400)
            .send({ error: 'Name query parameter is required' });
    }
    if(!req.query.country) {
        return res
            .status(400)
            .send({ error: 'Country query parameter is required' });
    }
    let APIbyNameAndOrigin = apiURL + "?name=" + req.query.name + "&country_id=" + req.query.country;
    let returnValue = await fetch(APIbyNameAndOrigin)
    .then(response => {
        if(!response.ok) throw new Error('API response was not ok');
        return response.json();
    })
    .then(value => {
        return apiResponseConstructor(generateNormalRandom(value.age));
    });
    res.send(returnValue);
});

router.get('/range', async (req, res) => {
    if(!req.query.minAge) {
        return res
            .status(400)
            .send({ error: 'minAge query parameter is required' });
    } else if(req.query.minAge < MINIMUM_AGE) {
        return res
            .status(400)
            .send({ error: 'minAge can\'t be under 18' });
    }
    if(!req.query.maxAge) {
        return res
            .status(400)
            .send({ error: 'maxAge query parameter is required' });
    } else if(req.query.maxAge > MAXIMUM_AGE + 1) {
        return res
            .status(400)
            .send({ error: 'maxAge can\'t be over 85' });
    }
    if(req.query.minAge >= req.query.maxAge || req.query.maxAge <= req.query.minAge) {
        return res
            .status(400)
            .send({ error: 'maxAge can\'t be under minAge et vice versa !' });
    }
    const min = req.query.minAge;
    const max = req.query.maxAge;
    const value = Math.floor(Math.random() * (parseInt(max) - parseInt(min))) + parseInt(min);
    res.send(apiResponseConstructor(value));
});

function generateNormalRandom(mean) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    let result = z0 * PLUSMINUS + mean;

    result = Math.max(MINIMUM_AGE, Math.min(MAXIMUM_AGE, result));

    return Math.floor(result);
}

const apiResponseConstructor = (age) => {
    const result = {
        age: age,
    }
    return result;
}

export { router };
