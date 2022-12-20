require('dotenv').config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`
});

const portServer = process.env.PORT || 3000;
const authConfig = process.env.AUTH_CONFIG || 'XXX';
const authAdminConfig = process.env.AUTH_ADMIN_CONFIG || 'XXX';
const BCRYPT_HASH_ROUND = 10;

export {
  portServer,
  authConfig,
  authAdminConfig,
  BCRYPT_HASH_ROUND,
}
