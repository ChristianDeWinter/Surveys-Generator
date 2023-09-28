--first create database
CREATE DATABASE IF NOT EXISTS survey;
--second create a table in the database
CREATE TABLE IF NOT EXISTS login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    usertype VARCHAR(50) NOT NULL
);
-- if database is not created you will get error
