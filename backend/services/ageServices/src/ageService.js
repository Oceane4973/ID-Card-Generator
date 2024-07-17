import express from 'express'
const apiURL = "https://api.agify.io/";

const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 85;

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
        return apiResponseConstructor(value.age);
    });
    res.send(returnValue);
});

router.get('/range', async (req, res) => {
    if(!req.query.minAge) {
        return res
            .status(400)
            .send({ error: 'Minimum query parameter is required' });
    } else if(req.query.minAge < MINIMUM_AGE) {
        return res
            .status(400)
            .send({ error: 'Minimum can\'t be under 18' });
    }
    if(!req.query.maxAge) {
        return res
            .status(400)
            .send({ error: 'Maximum query parameter is required' });
    } else if(req.query.maxAge > MAXIMUM_AGE + 1) {
        return res
            .status(400)
            .send({ error: 'Maximum can\'t be over 85' });
    }
    const min = req.query.minAge;
    const max = req.query.maxAge;
    const value = Math.floor(Math.random() * (parseInt(max) - parseInt(min))) + parseInt(min);
    res.send(apiResponseConstructor(value));
});

const apiResponseConstructor = (age) => {
    const result = {
        age: age,
    }
    return result;
}

export { router };
