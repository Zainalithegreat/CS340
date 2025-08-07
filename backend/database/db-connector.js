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

// reqires
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// port
const PORT = 55111;

app.use(cors());
app.use(express.json());

//  This route fetches all rows from the Members table in the database and returns them as a JSON response.
app.post('/fetch_members', async (req, res) => {
    try {
        // Query for selecting Members
        const [rows] = await pool.query('SELECT * FROM Members');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//This route fetches all rows from the Books table in the database and returns them as a JSON response.
app.post('/fetch_books', async (req, res) => {
    try {
        // Query for selecting Books
        const [rows] = await pool.query('SELECT * FROM Books');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//This route fetches all rows from the Genres table in the database and returns them as a JSON response.
app.post('/fetch_genres', async (req, res) => {
    try {
        // Query for selecting Genres
        const [rows] = await pool.query('SELECT * FROM Genres');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route fetches all rows from the Books has Genres table in the database and returns them as a JSON response.
app.post('/fetch_Books_Has_Genres', async (req, res) => {
    try {
        // Query for selecting BooksHasGenres
        const [rows] = await pool.query('SELECT * FROM BooksHasGenres');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route fetches all checkout records from the Checkouts table, along with book and member information using a Inner Join.
// It returns a combined result with fields from the Checkouts, Books, and Members tables.
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

// This route fetches all rows from the Authors table in the database and returns them as a JSON response.
app.post('/fetch_authors', async (req, res) => {
    try {
        // Query for selecting Authors
        const [rows] = await pool.query('SELECT * FROM Authors');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route fetches member names
app.post('/fetch_memberIds', async(req, res) =>{
     try {
        // Query for getting member ids
        const [rows] = await pool.query('SELECT idMember, name FROM Members');
        res.status(200).json(rows);

    } catch (err) {
        console.error('Error fetching member IDs:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// This route fetches book titles
app.post('/fetch_bookIds', async(req, res) =>{
    try {
        // Query for getting book ids
        const [rows] = await pool.query('SELECT title FROM Books');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching member IDs:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// This route deletes a Checkout row given an ID
app.post('/delete_row', async (req, res) => {
    const { id } = req.body;
    console.log([id])
    try {
        // Query for deleting Checkouts
        const [rows] = await pool.query('CALL sp_delete_checkouts(?)', [id]);
        res.status(200).json({ message: 'Checkout deleted successfully' });
    } catch (err) {
        console.error('Error deleting checkout row:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route updates a row given the parameters and the checkoutid
app.post('/update_row', async(req, res) =>{
    const { idCheckout, selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB } = req.body;
    try {
        // Query for updating rows
        const [rows] = await pool.query(
            'CALL sp_Update_checkouts(?, ?, ?, ?, ?, ?)',
            [idCheckout, selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// This route gets the member's id given a name
app.post('/get_member_id', async (req, res) => {
   const {name} = req.body;
    try {
        // Query for getting memberid
        const [rows] = await pool.query('SELECT idMember FROM Members WHERE name = ?', [name]);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route gets the book's id given title
app.post('/get_book_id', async (req, res) => {
    const {title} = req.body;
    try {
        // Query for getting bookid
        const [rows] = await pool.query('SELECT idBook FROM Books WHERE title = ?', [title]);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// This route inserts a row into the database
app.post('/insert_row', async (req, res) => {
    const { selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB } = req.body;

    try {
        // Query for inserting a row
        const [result] = await pool.query(
            'CALL sp_insert_checkouts(?, ?, ?, ?, ?)',
            [selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB || null] // handles optional returnDate
        );
        res.status(200).json({ message: 'Row inserted', insertId: result.insertId });
    } catch (err) {
        console.error('Error inserting row:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/reset_db', async (req, res) =>{
    try{
        const [result] = await pool.query('CALL sp_reset_database()')
        res.status(200).json({ message: 'DB reset complete'});
    }catch(err){
        console.error('Error inserting row:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});