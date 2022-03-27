import { createConnection } from 'typeorm';

createConnection()
  .then(async _ => {
    console.log('Connected to DB');
  })
  .catch(error => console.log('TypeORM connection error: ', error));
