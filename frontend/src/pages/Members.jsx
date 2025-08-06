// ########################################
// Members.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

import React, { useEffect, useState } from 'react';

function Members() {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
         // This function fetches members so it can be displayed.
        async function fetchMembers() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_members', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
                // If the response is ok it will get stored in data
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data); // set state to display it

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

        fetchMembers();
    }, []);

    console.log(members)

    // This return statement will display all the members that the fetchMembers is fetching
    return (
    <div className="home-container">
        <h2 className="section-title">Members</h2>

        {error && <p className="error-text">Error: {error}</p>}

        {members.length > 0 ? (
            <ul className="member-list">
                {members.map((member, index) => (
                    <li key={index} className="member-item">
                        <h2>idMember: {member.idMember}, email: {member.email}, name: {member.name}, phoneNumber: {member.phoneNumber}</h2>
                        <br />
                    </li>
                ))}
            </ul>
        ) : (
            <p className="loading-text">Loading members...</p>
        )}
    </div>
    );

}

export default Members;
