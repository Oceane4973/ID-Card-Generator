import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5007/api/v1/id';

// Définir les fonctions generateSimpleId et generateComplexId en dehors de la classe
export async function generateSimpleId(req, res) {
  try {
    const response = await fetch(`${apiURL}/simple`);
    if (!response.ok) throw new Error('API response was not ok');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function generateComplexId(req, res) {
  try {
    const response = await fetch(`${apiURL}/complex`);
    if (!response.ok) throw new Error('API response was not ok');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

class IdRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/simple', generateSimpleId);
    this.router.get('/complex', generateComplexId);
  }
}

export default new IdRoutes().router;
