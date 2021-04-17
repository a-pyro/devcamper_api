import express from 'express';
import dotenv from 'dotenv';
import bootCampsRoutes from './routes/bootcamp.js';
import listEndpoints from 'express-list-endpoints';
// import { logger } from './middlewares/logger.js';
import morgan from 'morgan';

// carica env vars nel process
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// monto i routers
app.use('/api/v1/bootcamps', bootCampsRoutes);

app.listen(
  5000,
  console.log(`server 🏃‍♂️ in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// console.log(listEndpoints(app));

app.on('error', () => {
  console.log('😭');
});
