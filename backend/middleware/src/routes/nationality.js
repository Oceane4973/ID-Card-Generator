import express from 'express';
import fetch from 'node-fetch';

const apiURL = 'http://localhost:5006/api/v1/nationality';

class NationalityRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byName', this.nationalityByFirstname);
  }

  async nationalityByFirstname(req, res) {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    try {
      const response = await fetch(`${apiURL}/ByName?name=${name}`);
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new NationalityRoutes().router;
