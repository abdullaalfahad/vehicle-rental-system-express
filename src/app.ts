import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

export default app;
