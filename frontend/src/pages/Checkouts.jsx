import React, { useEffect, useState } from 'react';
import Update from './Update'
import { useNavigate } from 'react-router-dom';

function Checkouts() {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const [membersID, setMemberID] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [booksID, setBookID] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_checkouts', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    const data = await response.json();
                    setMembers(data); // set state to display it

                const ids = [...new Set(data.map(member => Number(member.idMember)))];
                setMemberID(ids);

                const bookIds = [...new Set(data.map(member => Number(member.idBook)))];
                setBookID(bookIds);
                } else {
                    const err = await response.json();
                    setError(err.message);
                }
            } catch (err) {
                console.error("Something went wrong:", err);
                setError("Fetch failed");
            }
        }

        fetchMembers();
    }, []);

    useEffect(() => {
        if (membersID.length === 0) return;
        async function fetchMemberIDs(){
            try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_memberIds', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(membersID)
                    });
                if (response.ok) {
                            const data = await response.json();
                            setMemberNames(data);
                        } else {
                            const err = await response.json();
                            setError(err.message);
                        }
                } catch (err) {
                        console.error("Something went wrong:", err);
                        setError("Fetch failed");
                }
        }
     fetchMemberIDs();
    }, [membersID]);

    useEffect(() => {
        if (booksID.length === 0) return;
        async function fetchBookIDs(){
            try {
            const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_bookIds', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(booksID)
                    });
                if (response.ok) {
                            const data = await response.json();
                            setBooksTitle(data);
                        } else {
                            const err = await response.json();
                            setError(err.message);
                        }
                } catch (err) {
                        console.error("Something went wrong:", err);
                        setError("Fetch failed");
                }
        }
     fetchBookIDs();
    }, [booksID]);


    async function insert(e) {
        e.preventDefault();
    }

    const navigate = useNavigate();
    const handleUpdateClick = () => {
        navigate('/Update')
    };

    console.log(members)
    console.log(booksTitle)
    console.log(memberNames)

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
