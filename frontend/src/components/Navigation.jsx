import React from 'react';

function Navigation() {
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
