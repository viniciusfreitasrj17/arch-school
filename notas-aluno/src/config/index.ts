require('dotenv').config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`
});

const portServer = process.env.PORT || 3000;
const authConfig = process.env.AUTH_CONFIG || 'XXX';
const hostDB = process.env.DB_HOST;
const portDB = Number(process.env.DB_PORT);
const usernameDB = process.env.DB_USER;
const passwordDB = process.env.DB_PASS;
const databaseName = process.env.DB_NAME;

export {
  portServer,
  authConfig,
  hostDB,
  portDB,
  usernameDB,
  passwordDB,
  databaseName
}
