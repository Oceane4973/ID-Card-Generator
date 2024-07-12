import express from 'express';

class NameRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/random', this.generateRandomName);
    this.router.get('/byGender', this.generateNameByGender);
  }

  generateRandomName(req, res) {
    res.json({ firstName: 'Jean', lastName: 'Dupont' });
  }

  generateNameByGender(req, res) {
    const { gender } = req.query;
    if (gender === 'male') {
      res.json({ firstName: 'Jean', lastName: 'Dupont' });
    } else if (gender === 'female') {
      res.json({ firstName: 'Marie', lastName: 'Curie' });
    } else {
      res.status(400).json({ error: 'Invalid gender' });
    }
  }
}

export default new NameRoutes().router;
