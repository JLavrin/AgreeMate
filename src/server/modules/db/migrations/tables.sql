-- create table users
CREATE EXTENSION pgcrypto;

CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL
);

CREATE TABLE clients_address
(
    id      SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    city    TEXT NOT NULL,
    state   TEXT NOT NULL,
    zip     TEXT NOT NULL
);

CREATE TABLE clients_owners
(
    id         SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    phone      TEXT NOT NULL
);

CREATE TABLE fields
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE agreements
(
    id        SERIAL PRIMARY KEY,
    shortname TEXT NOT NULL,
    file      bytea NOT NULL,
    fields_id INTEGER REFERENCES fields (id)
);

CREATE TABLE clients
(
    id         SERIAL PRIMARY KEY,
    name       TEXT DEFAULT NULL,
    address_id INTEGER REFERENCES clients_address (id),
    owner_id   INTEGER REFERENCES clients_owners (id)
);

CREATE TABLE clients_agreements
(
    id        SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients (id),
    agreement TEXT NOT NULL,
    date      TEXT NOT NULL
);


