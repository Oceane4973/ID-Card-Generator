import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5005/api/v1/name/';

export const generateRandomName = async () => {
  const response = await fetch(`${apiURL}/random`);
  if (!response.ok) throw new Error('API response was not ok');
  const data = await response.json();
  return data;
};

export const generateNameByGender = async (gender) => {
  if (!name) {
    throw new Error('Name query parameter is required');
  }
  if (!gender) {
    throw new Error('Gender query parameter is required');
  }

  const response = await fetch(`${apiURL}/byGender?gender=${gender}`);
  if (!response.ok) throw new Error('API response was not ok');
  const data = await response.json();
  return data;
};

class NameRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/random', this.handleGenerateRandomName);
    this.router.get('/byGender', this.handleGenerateNameByGender);
  }

  async handleGenerateRandomName(req, res) {
    try {
      const data = await generateRandomName();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async handleGenerateNameByGender(req, res) {
    const { gender } = req.query;
    try {
      const data = await generateNameByGender(gender);
      res.json(data);
    } catch (error) {
      if (error.message.includes('query parameter is required')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}


export default new NameRoutes().router;
