DROP DATABASE IF EXISTS awty_db;

CREATE DATABASE awty_db;

USE awty_db;

CREATE TABLE trips (
	id int AUTO_INCREMENT NOT NULL,
    trip_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE locations (
	id int AUTO_INCREMENT NOT NULL,
    location_name GEOMETRY,
    trips_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (trips_id) REFERENCES trips(id)
);

CREATE TABLE users (
	id int AUTO_INCREMENT NOT NULL,
	name VARCHAR(255),
    trips_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (trips_id) REFERENCES trips(id)
);

CREATE TABLE posts (
	id int AUTO_INCREMENT NOT NULL,
    body VARCHAR(255),
    author VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES users(name)
);