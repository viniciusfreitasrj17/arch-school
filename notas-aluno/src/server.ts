import app from './app';
import { portServer } from './config'
import { pool } from './config/database';
import { serverLogger } from './config/logger';

pool.connect()
  .then(() => {
    serverLogger.info('Connected to DB');

    app.listen(portServer, () => {
      serverLogger.info(`🏃 Running Server on port ${portServer} ✨`);
    });
  })
  .catch(error => {
    serverLogger.error('DB connection error: ', error)
  })

