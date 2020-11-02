CREATE DATABASE wimproject;

--\c into wimproject

CREATE TABLE acquire(
    entry_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    pname VARCHAR(255),
    lat VARCHAR(255),
    lng VARCHAR(255)
);