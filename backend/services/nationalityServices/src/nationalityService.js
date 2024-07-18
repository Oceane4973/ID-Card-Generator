import express from 'express';
import axios from 'axios';
import iso3166 from 'iso-3166-1';

const router = express.Router();

router.get('/ByName', async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res
            .status(400)
            .send({ error: 'Name query parameter is required' });
    }

    try {
        const response = await axios.get(
            `https://api.nationalize.io?name=${name}`
        );
        const country_id = getRandomCountry(response.data.country);
        const country_name = getCountryName(country_id);
        const nationality = await getNationality(country_id);
        res.send({
            'country_id': country_id,
            'nationality': nationality,
            'country_name': country_name,
        });
    } catch (error) {
        console.error('Error in /ByName route:', error);
        res.status(500).send({
            error: 'Error fetching data from Nationalize API',
        });
    }
});

function getRandomCountry(countries) {
    try {
        // Calculer la somme totale des probabilités
        const totalProbability = countries.reduce((sum, country) => sum + country.probability, 0);
        
        // Normaliser les probabilités pour que leur somme soit égale à 1
        const normalizedCountries = countries.map(country => ({
            ...country,
            probability: country.probability / totalProbability
        }));

        const random = Math.random();
        let sum = 0;

        for (const country of normalizedCountries) {
            sum += country.probability;
            if (random < sum) {
                return country.country_id;
            }
        }

        // En théorie, cette ligne ne devrait jamais être atteinte
        // car la somme des probabilités normalisées est égale à 1
        return normalizedCountries[normalizedCountries.length - 1].country_id;
    } catch (error) {
        console.error('Error in getRandomCountry function:', error);
        throw new Error('Error calculating random country');
    }
}

function getCountryName(isoCode) {
    try {
        const country = iso3166.whereAlpha2(isoCode);
        return country ? country.country : 'Invalid ISO Code';
    } catch (error) {
        console.error('Error in getCountryName function:', error);
        return 'Invalid ISO Code';
    }
}

async function getNationality(isoCode) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${isoCode}`);
        if (response.status === 200) {
            const countryData = response.data;
            return countryData[0].demonyms.eng.m;
        } else {
            return 'Invalid ISO Code';
        }
    } catch (error) {
        console.error('Error fetching data from REST Countries API:', error);
        return 'Error fetching data';
    }
}

export { router };
