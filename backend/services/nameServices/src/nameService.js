import axios from 'axios';
import express from 'express'
const apiURL = "https://randomuser.me/api/";

const router = express.Router();

router.get('/random', async (req, res) => {
    let returnValue = await fetch(apiURL)
    .then(response => {
        if(!response.ok) throw new Error('API response was not ok');
        return response.json();
    })
    .then(value => {
        return apiResponseConstructor(value.results[0].name.first, value.results[0].name.last);
    });
    res.send(returnValue);
});

router.get('/byGender', async (req, res) => {
    if(!req.query.gender) {
        return res
            .status(400)
            .send({ error: 'Gender query parameter is required' });
    } else if(req.query.gender != "female" && req.query.gender != "male") {
        return res
            .status(400)
            .send({ error: 'Gender msut be female or male' });
    }
    let APIbyGender = apiURL + "?gender=" + req.query.gender;
    let returnValue = await fetch(APIbyGender)
    .then(response => {
        if(!response.ok) throw new Error('API response was not ok');
        return response.json();
    })
    .then(value => {
        return apiResponseConstructor(value.results[0].name.first, value.results[0].name.last);
    });
    res.send(returnValue);
});

const apiResponseConstructor = (firstName, lastName) => {
    const result = {
        firstName: firstName,
        lastName: lastName,
    }
    return result;
}

export { router };
