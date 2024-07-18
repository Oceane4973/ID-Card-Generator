import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5004/api/v1/gender';

// Définir les fonctions determineGenderByFirstname et determineGenderByNameAndOrigin en dehors de la classe
export async function determineGenderByFirstname(req, res) {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  try {
    const response = await fetch(`${apiURL}/byName?name=${name}`);
    if (!response.ok) throw new Error('API response was not ok');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function determineGenderByNameAndOrigin(req, res) {
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
    res.status(500).json({ error: 'Error recovering gender data.' });
  }
}

class GenderRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byName', determineGenderByFirstname);
    this.router.get('/byNameAndOrigin', determineGenderByNameAndOrigin);
  }
}

export default new GenderRoutes().router;
