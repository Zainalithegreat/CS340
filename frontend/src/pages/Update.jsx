// ########################################
// Update.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

// React related imports
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Update(){
    // All variables used to Update a row in DB
    const [membersID, setMemberID] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [booksID, setBookID] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMemberName, setSelectedMemberName] = useState('');
    const [selectedBookTitle, setSelectedBookTitle] = useState('');
    const [selectedMemberID, setSelectedMemberID] = useState(0);
    const [selectedBookID, setSelectedBookID] = useState(0);
    const [checkoutDateDB, setCheckoutDate] = useState('');
    const [dueDateDB, setDueDate] = useState('');
    const [returnDateDB, setReturnDate] = useState('');

    const idCheckout = localStorage.getItem("checkout");
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
    // Fetches member names
    async function fetchMemberNames() {
        try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_memberIds', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            });
            // Everything worked out
            if (response.ok) {
                const data = await response.json();
                setMemberNames(data);
            // Something broke
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

        fetchMemberNames();
    }, []);

    useEffect(() => {
        // Fetches member names
        async function fetchBookTitles() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_bookIds', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                });
                // Everything worked
                if (response.ok) {
                    const data = await response.json();
                    setBooksTitle(data);
                // Something went wrong
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

        fetchBookTitles();
    }, []);

    // This updates a query
    async function UpdateQuery(e){
        try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/update_row', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({idCheckout, selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB})
            });
            if (response.ok) {
                console.log("Everything updated")
            } else {
                const err = await response.json();
                setError(err.message);
            }
        } catch (err) {
            console.error("Something went wrong:", err);
            setError("Delete failed");
        }
    }

     // Handles when the member has change on the UI
    async function handleMemberChange(e) {
        const name = e.target.value;
        setSelectedMemberName(name);
        console.log("Name: ", name)
        const response = await fetch('http://classwork.engr.oregonstate.edu:55111/get_member_id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("memberId", data)
            setSelectedMemberID(data[0].idMember)
        } else {
            const err = await response.json();
            setError(err.message);
        }
    }

     // Handles when the book has change on the UI
    async function handleBookChange(e) {
        const title = e.target.value;
        setSelectedBookTitle(title);
        console.log("title: ", title)

        const response = await fetch('http://classwork.engr.oregonstate.edu:55111/get_book_id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("bookId", data)
            setSelectedBookID(data[0].idBook)
        } else {
            const err = await response.json();
            setError(err.message);
        }
    }

    // This is where all the displaying happens
    return (
        <>
        <form onSubmit={UpdateQuery}>
            <h1>Update</h1>
            <label>Member's name(MemberID)</label>
            <select value={selectedMemberName} onChange={handleMemberChange}>
                <option></option>
                {memberNames.map((m, index) => (
                    <option key={index} value={m.name}>{m.name}</option>
                ))}

            </select>

            <br/><label>Book's Title(BookID)</label>
            <select value={selectedBookTitle} onChange={handleBookChange}>
                <option></option>
                {booksTitle.map((m, index) => (
                    <option key={index} value={m.title}>{m.title}</option>
                ))}
            </select>

            <br /> Checkout Date: <input
                type="date"
                id="checkout"
                name="checkout"
                value={checkoutDateDB}
                onChange={(e) => setCheckoutDate(e.target.value)}
            />

            <br /> Due Date: <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={dueDateDB}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <br /> Return Date: <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={returnDateDB}
                onChange={(e) => setReturnDate(e.target.value)}
            />

            <br/>
            <button type="submit" name="type" value="submit" className="main-button">Insert</button>
        </form>
        </>
    );
}

export default Update;