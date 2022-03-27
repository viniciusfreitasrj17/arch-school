import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import app from './app';

require('dotenv').config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`
});

createConnection()
  .then((conn: Connection) => {
    console.log(`Connected to DB: ${conn.name}`);

    app.listen(process.env.PORT || 3000, () => {
      console.log('🏃 Running Server ✨');
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
