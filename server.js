import express from 'express';
import dotenv from 'dotenv';
import bootCampsRoutes from './routes/bootcamp.js';

// carica env vars nel process
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// monto i router
app.use('/api/v1/bootcamps', bootCampsRoutes);

app.listen(
  5000,
  console.log(`server 🏃‍♂️ in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.on('error', () => {
  console.log('😭');
});
