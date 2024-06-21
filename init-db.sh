#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO
    \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'huinya') THEN
            CREATE USER huinya WITH PASSWORD 'O71337l23814dfsbvuio8697834';
        END IF;
    END
    \$\$;

    SELECT 'CREATE DATABASE huinya'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'huinya')\\gexec

    GRANT ALL PRIVILEGES ON DATABASE huinya TO huinya;
EOSQL