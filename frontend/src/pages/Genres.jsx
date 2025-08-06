// ########################################
// Genres.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################


import React, { useEffect, useState } from 'react';

function Genres() {
    // variables
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
         // This function fetches genres this will fetch genres from the database
        async function fetchGenres() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_genres', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setGenres(data); // set state to display it

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

        fetchGenres();
    }, []);

    // Displays everything that is returned by fetch genres
    return (
    <div className="home-container">
        <h2 className="section-title">Genres</h2>

        {error && <p className="error-text">Error: {error}</p>}

        {genres.length > 0 ? (
            <ul className="member-list">
                {genres.map((genre, index) => (
                    <li key={index} className="member-item">
                        <h2>idGenre: {genre.idGenre}, name: {genre.name}, description: {genre.description}</h2>
                        <br />
                    </li>
                ))}
            </ul>
        ) : (
            <p className="loading-text">Loading Genres...</p>
        )}
    </div>
    );
}

export default Genres;