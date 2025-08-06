// ########################################
// Authors.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

import React, { useEffect, useState } from 'react';

function Authors() {
    // Variables
    const [authors, setAuthor] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // This function fetches Authors so it can be displayed.
        async function fetchAuthors() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_authors', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setAuthor(data); // set state to display it
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

        fetchAuthors();
    }, []);

    // Displays everything that is returned by fetch authors
    return (
    <div className="home-container">
        <h2 className="section-title">Authors</h2>

        {error && <p className="error-text">Error: {error}</p>}

        {authors.length > 0 ? (
            <ul className="member-list">
                {authors.map((author, index) => (
                    <li key={index} className="member-item">
                        <h2>idAuthor: {author.idAuthor}, name: {author.name}, biography: {author.biography}</h2>
                        <br />
                    </li>
                ))}
            </ul>
        ) : (
            <p className="loading-text">Loading authors...</p>
        )}
    </div>
    );
}

export default Authors;
