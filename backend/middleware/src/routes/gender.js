import express from 'express';

class GenderRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/createWithFirstName', this.determineGenderByFirstname);
  }

  determineGenderByFirstname(req, res) {
    const { firstname } = req.query;
    if (firstname === 'Jean') {
      res.json({ gender: 'male' });
    } else if (firstname === 'Marie') {
      res.json({ gender: 'female' });
    } else {
      res.status(400).json({ error: 'Invalid firstname' });
    }
  }
}

export default new GenderRoutes().router;
