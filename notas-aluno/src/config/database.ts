import { Pool } from 'pg';
import { databaseName, hostDB, passwordDB, portDB, usernameDB } from '.'

const isProd = process.env.ENVIRONMENT === 'PROD'

const configDev = {
  host: hostDB,
  port: portDB,
  user: usernameDB,
  password: passwordDB,
  database: databaseName,
}

const configProd = {
  host: hostDB,
  port: portDB,
  user: usernameDB,
  password: passwordDB,
  database: databaseName,
  ssl: {
    rejectUnauthorized: false
  },
  idleTimeoutMillis: 10000,
  max: 5,
}

const config = isProd ? configProd : configDev

export const pool: Pool = new Pool(config);
