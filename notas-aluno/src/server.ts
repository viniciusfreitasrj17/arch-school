import app from './app';
import { portServer } from './config'
import { pool } from './config/database';

pool.connect()
  .then(() => {
    console.log('Connected to DB');

    app.listen(portServer, () => {
      console.log(`🏃 Running Server on port ${portServer} ✨`);
    });
  })
  .catch(error => {
    console.log('TypeORM connection error: ', error)
  })

