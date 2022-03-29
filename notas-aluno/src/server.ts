import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import app from './app';
import { portServer } from './config'

require('dotenv').config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`
});

createConnection()
  .then((conn: Connection) => {
    console.log(`Connected to DB: ${conn.name}`);

    app.listen(portServer, () => {
      console.log('🏃 Running Server ✨');
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
