-- Up
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);
CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    description TEXT,
    imageName TEXT UNIQUE,
    imageUrl TEXT,
    count INTEGER,
    price REAL
);
CREATE TABLE Content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    homeHeader TEXT,
    homeContent TEXT,
    about TEXT,
    aboutMission TEXT,
    aboutVision TEXT,
    contactPhone TEXT,
    contactPhoneSecond TEXT,
    contactAddress TEXT,
    contactMail TEXT,
    contactMailSecond TEXT,
    contactFax TEXT
);
CREATE TABLE Messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderFullName TEXT UNIQUE,
    senderEmail TEXT UNIQUE,
    senderPhone TEXT UNIQUE,
    senderAddress TEXT,
    senderMessage TEXT
);
-- Down
DROP TABLE User;
DROP TABLE Product;
DROP TABLE Content;
DROP TABLE Messages;