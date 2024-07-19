import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5002/api/v1/birthplace';

export async function generateBirthplaceByCountry(req, res) {
  const { country } = req.query;
  if (!country) {
    return res.status(400).json({ error: 'Country query parameter is required' });
  }

  try {
    const response = await fetch(`${apiURL}/byCountry?country=${country}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("This country doesn't exist !");
      } else {
        throw new Error('API response was not ok');
      }
    }

    const data = await response.json();
    if (!data.birthPlace) {
      throw new Error('Invalid response structure');
    }

    res.json({ birthplace: data.birthPlace });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

class BirthplaceRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byCountry', generateBirthplaceByCountry);
  }
}

export default new BirthplaceRoutes().router;
