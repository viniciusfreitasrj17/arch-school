# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `yarn` command
2. Setup database settings inside `.env.development` file
3. Run `docker exec -it postgres psql -U postgres -c 'create database archdb;'` to create database
4. Run `NODE_ENV=development yarn typeorm migration:generate -n CreateMigration` to generate migration
5. Run `yarn dev` command
