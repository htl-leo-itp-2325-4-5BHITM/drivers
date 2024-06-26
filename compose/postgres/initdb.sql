DROP DATABASE if exists keycloak;
DROP USER if exists keycloak;
CREATE USER keycloak WITH PASSWORD 'keycloak' LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1;
CREATE DATABASE keycloak WITH OWNER=keycloak ENCODING='UTF8' CONNECTION LIMIT=-1;
