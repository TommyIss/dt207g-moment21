let express = require('express');
let cors = require('cors');
let mysql = require('mysql');
require('dotenv').config();
let app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Anslutning till databasen
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

app.get('/api', (req, res) => {
    res.json({message: 'Välkommen till API'});
});

app.get('/api/workexperience', (req, res) => {
    
    // Hämta jobberfarenhet
    connection.query(`SELECT * FROM workexperience`, (err, result) => {
        if(err) {
            res.status(500).json({error: 'Something went wrong: ' + err});
            return;
        }
        
        if(!result || result.length === 0) {
            res.status(404).json({message: 'Inga erfarenheter hittades'});
            return;
        }
        res.json(result);
        
    });
});

app.get('/api/workexperience/:id', (req, res) => {
    let id = req.params.id;

    // Hämta jobberfarenhet med specifik ID
    connection.query(`SELECT * FROM workexperience WHERE id=?`, [id], (err, result) => {
        if(err) {
            res.status(500).json({error: 'Something went wrong: ' + err});
            return;
        }
        
        if(!result || result.length === 0) {
            res.status(404).json({message: 'Inga erfarenheter hittades'});
            return;
        }

        res.json(result[0]);
        
    });
});

app.post('/api/workexperience', async (req, res) => {
    let { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Fel
    let errors = {
        message: '',
        detail: '',
        http_response: {

        }
    };

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Fel
        errors.message = 'Alla inmatningar inte uppfyllda';
        errors.detail = 'Du måste fylla alla inmatningsfält';
        errors.http_response.message = 'Bad Request';
        errors.http_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    // Lägg till i databasen
    await connection.query(`INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description)VALUES(?, ?, ?, ?, ?, ?);`, [companyname, jobtitle, location, startdate, enddate, description], (err, result) => {
        if(err) {
            res.status(500).json({error: 'Något har gått fel: ' + err});
            return;
        }

        console.log('Frågan skapad: ' + result);
    });

    let experience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };
    res.json({message: 'Erfarenhet är tillagd', experience});
});

// Uppdatera befintligt inlägg
app.put('/api/workexperience/:id', (req, res) => {
    let id = req.params.id;
    let { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Fel
    let errors = {
        message: '',
        detail: '',
        http_response: {

        }
    };

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Fel
        errors.message = 'Alla inmatningar inte uppfyllda';
        errors.detail = 'Du måste fylla alla inmatningsfält';
        errors.http_response.message = 'Bad Request';
        errors.http_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    // Uppdatera inlägget i databasen
    connection.query(`UPDATE workexperience SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?;`, [companyname, jobtitle, location, startdate, enddate, description, id], (err, result) => {
        if(err) {
            res.status(500).json({error: 'Något har gått fel: ' + err});
            return;
        }

        console.log('Frågan skapad: ' + result);
    });

    let experience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };
    // res.json({message: 'Erfarenhet är tillagd', experience});
    res.json({message: `Inlägget med id:${id} har uppdaterats`, experience});
});

// Radera befintligt inlägg
app.delete('/api/workexperience/:id', (req, res) => {
    let id = req.params.id;

    connection.query(`DELETE FROM workexperience WHERE id=?;`, [id], (err, result) => {
        if(err) {
            res.status(500).json({error: 'Något har gått fel'+ err});
            return;
        }

        console.log('Frågan har skapats: ' + result);
    });
    res.json({message: `Inlägget med id:${id} har raderats`});
});


app.listen(port, () => {
    console.log('Server startad on port: ' + port);
});