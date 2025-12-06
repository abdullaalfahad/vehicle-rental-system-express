import express, { Application } from 'express';
import initDB from './config/db';
const app: Application = express();

app.use(express.json());

initDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

export default app;
