import express from 'express'
const apiURL = "http://geodb-free-service.wirefreethought.com";

const router = express.Router();

router.get('/byCountry', async (req, res) => {
    if(!req.query.country) {
        return res
            .status(400)
            .send({ error: 'Country query parameter is required' });
    }
    // Verify that country's ISO code exists
    const apiCountryURL = apiURL + "/v1/geo/countries/" + req.query.country;
    let response = null;
    try {
        console.log("1")
        response = await fetch(apiCountryURL)
        if(!response.ok) throw new Error("This country doesn't exist !");
    } catch(error) {
        return res
            .status(400)
            .send({ error: error.message });
    }
    // Verify the number of cities from this country and creates random offset
    const apiCountryPlacesURL = apiCountryURL + "/places?limit=10&types=CITY&sort=name";
    let responseValue = null;
    let randomOffset = 0;
    try {
        console.log("2")
        response = await fetch(apiCountryPlacesURL)
        console.log("2.5")
        if(!response.ok) throw new Error("API response was not OK !");
        console.log("2.6")
        responseValue = await response.json();
        const numberOfPlacesMinus10 = responseValue.metadata.totalCount - 10;
        randomOffset = randomOffsetGenerator(numberOfPlacesMinus10 + 1);
    } catch(error) {
        return res
        .status(400)
        .send({ error: error.message });
    }
    const apiCountryPlacesWithOffsetURL = apiCountryPlacesURL + "&offset=" + randomOffset;
    // Search random city
    try {
        console.log("3")
        let returnValue = await fetch(apiCountryPlacesWithOffsetURL)
        .then(response => {
            if(!response.ok) throw new Error('API response was not ok');
            return response.json();
        })
        .then(value => {
            const randomCityNumber = randomOffsetGenerator(10);
            return apiResponseConstructor(value.data[randomCityNumber].name);
        });
        res.send(returnValue);
    } catch(error) {
        return res
        .status(400)
        .send({ error: error.message });
    }
});

const randomOffsetGenerator = (upperLimit) => {
    return Math.floor(Math.random() * upperLimit);
}

export const apiResponseConstructor = (birthPlace) => {
    return {
        birthplace: birthPlace,
    }
}

export { router, apiURL, randomOffsetGenerator };
