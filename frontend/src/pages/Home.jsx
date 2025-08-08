// ########################################
// Home.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

// react imports
import React, { useEffect, useState } from 'react';

function Home() {

    async function resetDB(){
        const response = await fetch('http://classwork.engr.oregonstate.edu:55111/reset_db', {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok){
            console.log("Reset Successful!")
            alert("Reset Successful!")
        }else{
            console.log("Unsuccessful")
        }
    }

    // This is just the basic Home page where it displays some basic things.
    return (
        <>
        <div>
            <button className= "bigger_button" onClick={resetDB}>Reset Button</button>
            <h1>Home Page</h1>
            <h2>All the CUD will be implemented in Checkouts page</h2>
            <h2>Project Description: </h2>
            <div className="page_description">
                <p>A small library with 1000 books and 100 members wants a system to track book checkouts, returns, and due dates. Currently, they are manually tracking each book. So we want to create a website where the librarian can check out books for members. Our website will have a back-end database, which will keep track of everything from who rented a book to the due date of that book. Our Members entity will store the data for each member, and our Books entity will store data from each book. The Books table and the Members table will have an M:N relationship via the  checkouts table. This will help keep track of who has checked out which book, as well as the book's checkout date and due date. This system will be capable of keeping track of more than 1000 books and more than 100 members.</p>
            </div>
        </div>
        </>
    );

}

export default Home;
