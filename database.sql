CREATE DATABASE wim;

--\c into wim
--ACQUIRING NEW PLACES (DATA ACQUISITION)

CREATE TABLE acquire(
    entry_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    pname VARCHAR(255),
    lat VARCHAR(255),
    lng VARCHAR(255)
);
CREATE TABLE rating(

    rating_id SERIAL PRIMARY KEY,
    pid DECIMAL,
    rating INTEGER,
    email VARCHAR(255),
    pname VARCHAR(255),
    uname VARCHAR(255),
    userphoto VARCHAR(255)
);
CREATE TABLE usertable(

    uuid SERIAL PRIMARY KEY,
      uname VARCHAR(255),
      email VARCHAR(255),
     userphoto VARCHAR(255)
);
CREATE TABLE contactus(

    uuid SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
     msg VARCHAR(255)
);
