require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = [{
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
}];
