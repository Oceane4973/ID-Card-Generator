import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5005/api/v1/name/';

class NameRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/random', this.generateRandomName);
    this.router.get('/byGender', this.generateNameByGender);
  }

  async generateRandomName(req, res) {
    try {
      const response = await fetch(`${apiURL}/random`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateNameByGender(req, res) {
    const { name, gender } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    if (!gender) {
      return res.status(400).json({ error: 'Gender query parameter is required' });
    }
    try {
      const response = await fetch(`${apiURL}/byGender?name=${name}&gender=${gender}`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new NameRoutes().router;
