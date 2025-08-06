// ########################################
// db-connector.js
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################
// ########## SETUP
// Get an instance of mysql we can use in the app
let mysql = require('mysql2')
const config = require("../../connection.json")

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : config.server,
    user              : config.user,
    password          : config.password,
    database          : config.database
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 55111;

app.use(cors());
app.use(express.json());


app.post('/fetch_members', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Members');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Books');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_genres', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Genres');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_Books_Has_Genres', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM BooksHasGenres');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_checkouts', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT Checkouts.idCheckout as Checkout_ID,
            Checkouts.idMember,
            Checkouts.idBook,
            Members.name,
            Books.title,
            Checkouts.checkoutDate,
            Checkouts.dueDate,
            Checkouts.returnDate
            FROM Checkouts
            INNER JOIN Books ON Books.idBook = Checkouts.idBook
            INNER JOIN Members ON Members.idMember = Checkouts.idMember`

        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_authors', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Authors');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/fetch_memberIds', async(req, res) =>{
    const memberIDs = req.body;
    var names = []
    try{
        for(let i=0; i < memberIDs.length; i++){
            const [rows] = await pool.query('SELECT name from Members where idMember = ?', [memberIDs[i]]);
            console.log("Member", rows)
            if (rows.length > 0) {
                names.push(rows[0].name);
            } else {
                names.push("Unknown");
            }
        }
        res.status(200).json(names)
    }catch (err){
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/fetch_bookIds', async(req, res) =>{
    const bookIDs = req.body;
    var names = []
    try{
        for(let i=0; i < bookIDs.length; i++){
            const [rows] = await pool.query('SELECT title FROM Books WHERE idBook = ?', [bookIDs[i]]);
            console.log("Books", rows)
            if (rows.length > 0) {
                names.push(rows[0].title);
            } else {
                names.push("Unknown");
            }
        }
        res.status(200).json(names)
    }catch (err){
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})


app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});