import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5007/api/v1/id';

class IdRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/simple', this.generateSimpleId);
    this.router.get('/complex', this.generateComplexId);
  }

  async generateSimpleId(req, res) {
    try {
      const response = await fetch(`${apiURL}/simple`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateComplexId(req, res) {
    try {
      const response = await fetch(`${apiURL}/complex`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new IdRoutes().router;
