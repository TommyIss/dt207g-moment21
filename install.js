let express = require('express');
let mysql = require('mysql');
require('dotenv').config();
let app = express();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if(err) {
        console.log('Anslutning misslyckades: ' + err);
    }

    console.log('Ansluten till databasen: ' + process.env.DB_DATABASE);
});

// Radera tabellen om det redan finns
connection.query('DROP TABLE IF EXISTS workexperience;', (err, resault) => {
    if(err) throw err;

    console.log('Tabellen har raderats;');
});

// Skapa tabellen på nytt
connection.query(`CREATE TABLE workexperience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    companyname VARCHAR(200),
    jobtitle VARCHAR(200),
    location VARCHAR(200),
    startdate DATE,
    enddate DATE,
    description TEXT
    );`, (err, resault) => {
        if(err) throw err;

        console.log('Tabellen har skapats!' + resault);
});