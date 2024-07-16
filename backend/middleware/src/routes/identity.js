import express from 'express';

class IdentityRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/simple', this.generateFullProfile);
    this.router.get('/byName', this.generateFullProfileByName);
    this.router.get('/byNationality', this.generateFullProfileByNationality);
  }

  generateFullProfile(req, res) {
    const { name, gender, country } = req.query;
    res.json({
      id: 'uuid-v4-string',
      firstName: 'Jean',
      lastName: 'Dupont',
      gender: 'male',
      nationality: 'French',
      birthplace: 'Paris',
      age: 29,
      faceImage: '/9j/4AAQSkZJRgABAQEAAAAAAAD...'
    });
  }

  generateFullProfileByName(req, res) {
    const { name } = req.query;
    res.json({
      id: 'uuid-v4-string',
      firstName: 'Jean',
      lastName: 'Dupont',
      gender: 'male',
      nationality: 'French',
      birthplace: 'Paris',
      age: 29,
      faceImage: '/9j/4AAQSkZJRgABAQEAAAAAAAD...'
    });
  }

  generateFullProfileByNationality(req, res) {
    const { nationality } = req.query;
    res.json({
      id: 'uuid-v4-string',
      firstName: 'Jean',
      lastName: 'Dupont',
      gender: 'male',
      nationality: 'French',
      birthplace: 'Paris',
      age: 29,
      faceImage: '/9j/4AAQSkZJRgABAQEAAAAAAAD...'
    });
  }
}

export default new IdentityRoutes().router;
