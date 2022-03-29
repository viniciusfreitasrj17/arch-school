#!/usr/bin/env bash

psql -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" \
  | grep -q 1 || psql -U $DB_USER -c "CREATE DATABASE ${DB_NAME};"\
  && psql -U $DB_USER -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER}"
