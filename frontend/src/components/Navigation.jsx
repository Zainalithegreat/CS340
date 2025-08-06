// ########################################
// Navigation.jsx
// This file was written and code by me
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

import React from 'react';

function Navigation() {
    // This is used for navigation
    return (
        <nav className="nav-container">
            <span className="nav-title">Navigation:</span>
            <a href="/">Home</a>
            <a href='/Members'>Members</a>
            <a href="/Books">Books</a>
            <a href="/Genres">Genres</a>
            <a href="/BooksHasGenres">Books Has Genres</a>
            <a href="/Checkouts">Checkouts</a>
            <a href="/Authors">Authors</a>
        </nav>
    );
}

export default Navigation;
