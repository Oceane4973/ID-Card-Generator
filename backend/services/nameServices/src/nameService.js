import axios from 'axios';
import express from 'express'
const apiURL = "https://randomuser.me/api/";

const router = express.Router();

router.get('/random', async (req, res) => {
    try {
        let returnValue = await fetch(apiURL)
        .then(response => {
            if(!response.ok) throw new Error('API response was not ok');
            return response.json();
        })
        .then(value => {
            return apiResponseConstructor(value.results[0].name.first, value.results[0].name.last);
        });
        console.log(returnValue);
        res.send(returnValue);
    } catch(error) {
        return res
            .status(400)
            .send({ error: error.message });
    }
});

router.get('/byGender', async (req, res) => {
    if(!req.query.gender) {
        return res
            .status(400)
            .send({ error: 'Gender query parameter is required' });
    } else if(req.query.gender != "female" && req.query.gender != "male") {
        return res
            .status(400)
            .send({ error: 'Gender must be female or male' });
    }
    let APIbyGender = apiURL + "?gender=" + req.query.gender;
    try {
        let returnValue = await fetch(APIbyGender)
        .then(response => {
            if(!response.ok) throw new Error('API response was not ok');
            return response.json();
        })
        .then(value => {
            return apiResponseConstructor(value.results[0].name.first, value.results[0].name.last);
        });
        res.send(returnValue);
    } catch(error) {
        return res
            .status(400)
            .send({ error: error.message });
    }
});

const apiResponseConstructor = (firstName, lastName) => {
    return {
        firstName: firstName,
        lastName: lastName,
    }
}

export { router, apiURL };
