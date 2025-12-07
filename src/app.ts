import express, { Application } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { vehicleRoutes } from './modules/vehicle/vehicle.routes';

const app: Application = express();

app.use(express.json());

initDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

export default app;
