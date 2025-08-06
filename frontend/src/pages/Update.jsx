// ########################################
// Update.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

// React related imports
import React, { useEffect, useState } from 'react';

function Update(){
    // All variables used to Update a row in DB
    const [membersID, setMemberID] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [booksID, setBookID] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            // This function Fetches checkouts from the database
            async function fetchCheckouts() {
                try {
                    const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_checkouts', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" }
                    });
                    // If the response is ok it will get stored in data
                    if (response.ok) {
                        const data = await response.json();

                        const ids = [...new Set(data.map(member => member.idMember))];
                        setMemberID(ids);
                        const bookIds = [...new Set(data.map(member => member.idBook))];
                        setBookID(bookIds)
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


    function UpdateQuery(e){
        e.preventDefault();
    }
    // This is where all the displaying happens
    return (
        <>
         <form onSubmit={UpdateQuery}>
            <h1>Update</h1>
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

            <br /><button type="submit" name="type" value="submit" className="main-button">Update</button>
        </form>
        </>
    );
}

export default Update;