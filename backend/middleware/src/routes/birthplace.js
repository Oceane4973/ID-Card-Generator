import express from 'express';

class BirthplaceRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byCountry', this.generateBirthplaceByCountry);
  }

  generateBirthplaceByCountry(req, res) {
    const { country } = req.query;
    res.json({ birthplace: 'Paris' });
  }
}

export default new BirthplaceRoutes().router;
