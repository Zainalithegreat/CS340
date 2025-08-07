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
    const [memberNames, setMemberNames] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);

    const [selectedMemberName, setSelectedMemberName] = useState('');
    const [selectedBookTitle, setSelectedBookTitle] = useState('');
    const [selectedMemberID, setSelectedMemberID] = useState(0);
    const [selectedBookID, setSelectedBookID] = useState(0);
    const [checkoutDateDB, setCheckoutDate] = useState('');
    const [dueDateDB, setDueDate] = useState('');
    const [returnDateDB, setReturnDate] = useState('');


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

                const bookIds = [...new Set(data.map(member => Number(member.idBook)))];
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


    // This will insert values into the database
    async function insert(e) {
        try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/insert_row', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({selectedMemberID, selectedBookID, checkoutDateDB, dueDateDB, returnDateDB})
            });
            if (response.ok) {
                const data = await response.json();
            } else {
                const err = await response.json();
                setError(err.message);
            }
        } catch (err) {
            console.error("Something went wrong:", err);
            setError("Delete failed");
        }
    }

    console.log(booksTitle)
    console.log(memberNames)

    // This function will delete a row from the checkouts table
    async function deleteRow(Checkout_id){
        console.log("GOt here")
        try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/delete_row', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: Checkout_id})
            });
            // Everything worked
            if (response.ok) {
                const data = await response.json();
                window.location.reload();
            // Ran into an error
            } else {
                const err = await response.json();
                setError(err.message);
            }
        // This is try catch, this will catch the error
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

    // This is navigate for react
    const navigate = useNavigate();

    // Navigates to the update page
    async function handleUpdateClick(idCheckout) {
        console.log("ID: ", idCheckout)
        navigate('/Update');
        localStorage.setItem("checkout", idCheckout);
    }

    // Displays everything that is returned by fetch genres
    // This will also display a form to insert a new row
    // This will also display a button that will delete a row
    // Also has a Update button which takes the user to the Updates page.
    return (
    <div className="home-container">
        <h2 className="section-title">Checkouts</h2>
        {error && <p className="error-text">Error: {error}</p>}

        {checkouts.length > 0 ? (
            <ul className="member-list">
                {checkouts.map((checkout, index) => (
                    <li key={index} className="member-item">
                        <h2>Checkout ID: {checkout.Checkout_ID}, Member ID: {checkout.idMember}, Book ID: {checkout.idBook}, Member Name: {checkout.name}, Book Title: {checkout.title}, checkoutDate: {checkout.checkoutDate}, dueDate: {checkout.dueDate}, returnDate: {checkout.returnDate}</h2>
                        <br />
                        <div>
                            <button onClick={() => handleUpdateClick(checkout.Checkout_ID)}>Update</button>
                            <button onClick={() => deleteRow(checkout.Checkout_ID)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="loading-text">Either Loading checkouts or no data found...</p>
        )}
        <form onSubmit={insert}>
            <h1>Insert</h1>
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
    </div>
    );
}

export default Checkouts;
