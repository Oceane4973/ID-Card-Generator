import express from 'express';

class FaceRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/byGenderAndAge', this.generateFaceByGenderAndAge);
  }

  generateFaceByGenderAndAge(req, res) {
    const { gender, age } = req.query;
    res.json({ 'image-b64': '/9j/4AAQSkZJRgABAQEAAAAAAAD...' });
  }
}

export default new FaceRoutes().router;
