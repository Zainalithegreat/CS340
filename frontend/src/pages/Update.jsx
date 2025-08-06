import React, { useEffect, useState } from 'react';

function Update(){
    const [membersID, setMemberID] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [booksID, setBookID] = useState([]);
    const [booksTitle, setBooksTitle] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            async function fetchMembers() {
                try {
                    const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_checkouts', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        const ids = [...new Set(data.map(member => member.idMember))];
                        setMemberID(ids);
                        const bookIds = [...new Set(data.map(member => member.idBook))];
                        setBookID(bookIds)
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


    function UpdateQuery(e){
        e.preventDefault();
    }
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