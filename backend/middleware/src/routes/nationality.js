import express from 'express';

class NationalityRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byFirstName', this.determineNationalityByFirstname);
  }

  determineNationalityByFirstname(req, res) {
    const { firstname } = req.query;
    res.json({ nationality: 'French' });
  }
}

export default new NationalityRoutes().router;
