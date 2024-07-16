import express from 'express';

class GenderRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byName', this.determineGenderByFirstname);
  }

  determineGenderByFirstname(req, res) {
    const { name } = req.query;
    if (name === 'Jean') {
      res.json({ gender: 'male' });
    } else if (name === 'Marie') {
      res.json({ gender: 'female' });
    } else {
      res.status(400).json({ error: 'Invalid name' });
    }
  }
}

export default new GenderRoutes().router;
