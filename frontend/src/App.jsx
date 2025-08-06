import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Genres from './pages/Genres';
import BooksHasGenres from './pages/BooksHasGenres';
import Checkouts from './pages/Checkouts';
import Authors from './pages/Authors';
import Members from './pages/Members';
import Update from './pages/Update';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 55115;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Members" element={<Members />} />
                <Route path="/Books" element={<Books />} />
                <Route path="/Genres" element={<Genres />} />
                <Route path="/BooksHasGenres" element={<BooksHasGenres />} />
                <Route path="/Checkouts" element={<Checkouts />} />
                <Route path="/Authors" element={<Authors />} />
                <Route path="/Update" element={<Update />} />
            </Routes>
        </>
    );

} export default App;