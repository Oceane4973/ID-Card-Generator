import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5001/api/v1/age';
const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 95;

class AgeRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/random', this.generateRandomAge);
    this.router.get('/byNameAndOrigin', this.generateAgeByNameOrigin);
    this.router.post('/range', this.generateAgeByRange);
  }

  async generateRandomAge(req, res) {
    try {
      const response = await fetch(`${apiURL}/random`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateAgeByNameOrigin(req, res) {
    const { name, country } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    if (!country) {
      return res.status(400).json({ error: 'Country query parameter is required' });
    }

    try {
      const response = await fetch(`${apiURL}/byNameAndOrigin?name=${name}&country_id=${country}`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateAgeByRange(req, res) {
    const { minAge, maxAge } = req.body;
    if (!minAge) {
      return res.status(400).json({ error: 'Minimum query parameter is required' });
    } else if (minAge < MINIMUM_AGE) {
      return res.status(400).json({ error: 'Minimum can\'t be under 18' });
    }
    if (!maxAge) {
      return res.status(400).json({ error: 'Maximum query parameter is required' });
    } else if (maxAge > MAXIMUM_AGE) {
      return res.status(400).json({ error: 'Maximum can\'t be over 95' });
    }

    try {
      const response = await fetch(`${apiURL}range`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minAge, maxAge })
      });
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AgeRoutes().router;
