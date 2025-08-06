// ########################################
// Checkouts.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################


import React, { useEffect, useState } from 'react';
import Update from './Update'
import { useNavigate } from 'react-router-dom';

function Checkouts() {
    // All the variables I will use in Checkouts file
    const [checkouts, setCheckouts] = useState([]);
    const [error, setError] = useState(null);
    const [membersID, setMemberID] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [booksID, setBookID] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);

    useEffect(() => {
         // This function fetches checkouts so it can be displayed.
        async function fetchCheckouts() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_checkouts', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setCheckouts(data); // set state to display it

                const ids = [...new Set(data.map(member => Number(member.idMember)))];
                setMemberID(ids);

                const bookIds = [...new Set(data.map(member => Number(member.idBook)))];
                setBookID(bookIds);
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

        fetchCheckouts();
    }, []);

    useEffect(() => {
        if (membersID.length === 0) return;
        // This function fetches members ids, this is used for dynamic drop down.
        async function fetchMemberIDs(){
            try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_memberIds', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(membersID)
                    });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setMemberNames(data);
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
     fetchMemberIDs();
    }, [membersID]);

    useEffect(() => {
        if (booksID.length === 0) return;
         // This function fetches books ids, this is used for dynamic drop down.
        async function fetchBookIDs(){
            try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_bookIds', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(booksID)
                    });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setBooksTitle(data);

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
     fetchBookIDs();
    }, [booksID]);

    // This will insert values into the database
    async function insert(e) {
        e.preventDefault();
    }
    // used for react navigation
    const navigate = useNavigate();

    // When the user click the update button we go to the Update page
    const handleUpdateClick = () => {
        navigate('/Update')
    };

    console.log(members)
    console.log(booksTitle)
    console.log(memberNames)

    // Displays everything that is returned by fetch genres
    // This will also display a form to insert a new row
    // This will also display a button that will delete a row
    return (
    <div className="home-container">
        <h2 className="section-title">Checkouts</h2>
        {error && <p className="error-text">Error: {error}</p>}

        {members.length > 0 ? (
            <ul className="member-list">
                {members.map((member, index) => (
                    <li key={index} className="member-item">
                        <h2>Checkout ID: {member.Checkout_ID}, Member ID: {member.idMember}, Book ID: {member.idBook}, Member Name: {member.name}, Book Title: {member.title}, checkoutDate: {member.checkoutDate}, dueDate: {member.dueDate}, returnDate: {member.returnDate}</h2>
                        <br />
                        <div>
                            <button onClick={handleUpdateClick}>Update</button>
                            <button>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="loading-text">Loading members...</p>
        )}
        <form onSubmit={insert}>
            <h1>Insert</h1>
            <label>Member's name(MemberID)</label><select>
                <option></option>
                {memberNames.map((id) => (
                    <option>{id}</option>
                ))}
            </select>

            <br /><label>Book's Title(BookID)</label><select>
                <option></option>
                {booksTitle.map((id) => (
                    <option>{id}</option>
                ))}
            </select>

            <br /><label for="checkout">checkout Date:</label>
            <input type="date" id="checkout" name="checkout"></input>

            <br /><label for="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate"></input>

            <br /><label for="returnDate">Return Date:</label>
            <input type="date" id="returnDate" name="returnDate"></input>

            <br /><button type="submit" name="type" value="submit" className="main-button">Insert</button>
        </form>
    </div>
    );
}

export default Checkouts;
