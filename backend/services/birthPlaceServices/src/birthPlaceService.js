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
    let response = await fetch(apiCountryURL)
    if(!response.ok) throw new Error("This country doesn't exist !");
    // Verify the number of cities from this country and creates random offset
    const apiCountryPlacesURL = apiCountryURL + "/places?limit=10&types=CITY&sort=name"
    response = await fetch(apiCountryPlacesURL)
    if(!response.ok) throw new Error("API response was'nt OK !");
    let responseValue = await response.json();
    const numberOfPlacesMinus10 = responseValue.metadata.totalCount - 10;
    const randomOffset = Math.floor(Math.random() * numberOfPlacesMinus10 + 1);
    const apiCountryPlacesWithOffsetURL = apiCountryPlacesURL + "&offset=" + randomOffset;
    // Search random city
    let returnValue = await fetch(apiCountryPlacesWithOffsetURL)
    .then(response => {
        if(!response.ok) throw new Error('API response was not ok');
        return response.json();
    })
    .then(value => {
        console.log(value)
        const randomCityNumber = Math.floor(Math.random() * 10);
        return {
            birthplace: value.data[randomCityNumber].name,
        }
        //return apiResponseConstructor(value.data[randomCityNumber].name);
    });
    res.send(returnValue);
});

export { router };
