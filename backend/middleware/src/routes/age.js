import express from 'express';

class AgeRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/random', this.generateRandomAge);
    this.router.get('/createWithNameAndOrigin', this.generateAgeByNameOrigin);
    this.router.get('/range', this.generateAgeByRange);
  }

  generateRandomAge(req, res) {
    res.json({ age: 29 });
  }

  generateAgeByNameOrigin(req, res) {
    const { firstname, country } = req.query;
    res.json({ age: 35 });
  }

  generateAgeByRange(req, res) {
    const { minAge, maxAge } = req.query;
    res.json({ age: 27 });
  }
}

export default new AgeRoutes().router;
