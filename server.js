import express from 'express';
import dotenv from 'dotenv';

// carica env vars nel process
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;
console.log(PORT);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(
  5000,
  console.log(`server 🏃‍♂️ in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.on('error', () => {
  console.log('😭');
});
