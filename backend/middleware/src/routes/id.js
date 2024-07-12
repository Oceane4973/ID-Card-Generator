import express from 'express';

class IdRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/simple', this.generateSimpleId);
    this.router.get('/complex', this.generateComplexId);
  }

  generateSimpleId(req, res) {
    res.json({ id: 'AZDFVBGNH' });
  }

  generateComplexId(req, res) {
    const { length, type } = req.query;
    res.json({ id: 'AZDFVBGNH' });
  }
}

export default new IdRoutes().router;
