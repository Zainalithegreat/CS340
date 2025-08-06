import React, { useEffect, useState } from 'react';

function Members() {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch('http://classwork.engr.oregonstate.edu:55111/fetch_members', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    const data = await response.json();
                    setMembers(data); // set state to display it
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

    console.log(members)

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
