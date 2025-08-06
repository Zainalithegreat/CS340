// ########################################
// Books.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

// imports
import React, { useEffect, useState } from 'react';

function Books() {
    // variables
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
       // This function fetches books so it can be displayed.
        async function fetchBooks() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_books', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data); // set state to display it

                // else it will throw an error
                } else {
                    const err = await response.json();
                    setError(err.message);
                }
            // This is try catch, this will catch the error
            } catch (err) {
                console.error("Something went wrong:", err);
                setError("Fetch failed");
            }
        }

        fetchBooks();
    }, []);

     // Displays everything that is returned by fetch books
    return (
    <div className="home-container">
        <h2 className="section-title">Books</h2>

        {error && <p className="error-text">Error: {error}</p>}

        {books.length > 0 ? (
            <ul className="member-list">
                {books.map((books, index) => (
                    <li key={index} className="member-item">
                        <h2>idBook: {books.idBook}, idAuthor: {books.idAuthor}, title: {books.title}, availability: {books.availability}, publishYear: {books.publishYear}</h2>
                        <br />
                    </li>
                ))}

            </ul>
        ) : (
            <p className="loading-text">Loading members...</p>
        )}
    </div>
    );
}

export default Books;