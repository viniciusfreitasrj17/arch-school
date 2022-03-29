import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg';
import { databaseName, hostDB, passwordDB, portDB, usernameDB } from '.'

export const pool: Pool = new Pool({
  host: hostDB,
  port: portDB,
  user: usernameDB,
  password: passwordDB,
  database: databaseName,
});
