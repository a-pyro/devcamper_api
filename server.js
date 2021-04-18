import express from 'express';
import dotenv from 'dotenv';
import bootCampsRoutes from './routes/bootcamp.js';
// import listEndpoints from 'express-list-endpoints';
// import { logger } from './middlewares/logger.js';
import morgan from 'morgan';
import connectDB from './config/db.js';
import colors from 'colors';

// carica env vars nel process
dotenv.config({ path: './config/config.env' });

//connetto DB
// lo metto dopo dotenv perchè ha bisogno di accedere al file
connectDB();

const app = express();

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser
app.use(express.json());

// monto i routers
app.use('/api/v1/bootcamps', bootCampsRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  5000,
  console.log(
    `server 🏃‍♂️ in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// console.log(listEndpoints(app));

// faccio chiudere l'app se fallisce l'accesso al database
//hanle unhandled promis rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //chiudi server e esci process
  server.close(() => {
    process.exit(1);
  });
});
