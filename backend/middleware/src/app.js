import express from 'express';
import IdRoutes from './routes/id.js';
import NameRoutes from './routes/name.js';
import GenderRoutes from './routes/gender.js';
import NationalityRoutes from './routes/nationality.js';
import BirthplaceRoutes from './routes/birthplace.js';
import AgeRoutes from './routes/age.js';
import FaceRoutes from './routes/face.js';
import IdentityRoutes from './routes/identity.js';
import cors from "cors";

const app = express();
app.use(cors());

app.use('/api/v1/id', IdRoutes);
app.use('/api/v1/name', NameRoutes);
app.use('/api/v1/gender', GenderRoutes);
app.use('/api/v1/nationality', NationalityRoutes);
app.use('/api/v1/birthplace', BirthplaceRoutes);
app.use('/api/v1/age', AgeRoutes);
app.use('/api/v1/face', FaceRoutes);
app.use('/api/v1/identity', IdentityRoutes);

export default app;
