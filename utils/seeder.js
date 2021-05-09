import fs from 'fs-extra';
import mongoose from 'mongoose';
import colors from 'colors';

const { readJson } = fs;
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//load models
import Bootcamp from '../models/Bootcamps.js';

// connect to db

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // in process.argv vedo se ho scritto -i o -d => check per importa o distruggere i dati|
    if (process.argv[2] === '-i') {
      importData();
    } else if (process.argv[2] === '-d') {
      deleteData();
    }

    const bootcampPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../_data/bootcamps.json'
    );
    // imp data into db
    const importData = async () => {
      try {
        const bootcamps = await readJson(bootcampPath);
        await Bootcamp.create(bootcamps);
        console.log('Data imported'.green.inverse);
        process.exit();
      } catch (error) {
        console.log(error);
      }
    };

    const deleteData = async () => {
      try {
        const bootcamps = await readJson(bootcampPath);
        await Bootcamp.deleteMany();
        console.log('Data destroyed'.red.inverse);
        process.exit();
      } catch (error) {
        console.log(error);
      }
    };
  });
