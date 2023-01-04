require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const isProd = process.env.ENVIRONMENT === 'PROD'

const configDev = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  // Add PATH in Server
  entities: ['./src/entity/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/database/migrations',
  }
}

const configProd = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
    connectionLimit: 5
  },
  // Add PATH in Server
  entities: ['./src/entity/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/database/migrations',
  }
}

const config = isProd ? configProd : configDev

module.exports = [config];
