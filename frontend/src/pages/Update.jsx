// ########################################
// Update.jsx
// This file was written and code by me
// I did use AI to find syntax errors since I am new to React and Node
// This file is my Original work with AI used for finding syntax errors and help me learn React and Node
// ########################################

// React related imports
import React, { useEffect, useState } from 'react';

function Update() {
  // State
  const [memberNames, setMemberNames] = useState([]);
  const [booksTitle, setBooksTitle] = useState([]);
  const [error, setError] = useState(null);

  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [selectedBookTitle, setSelectedBookTitle] = useState('');
  const [selectedMemberID, setSelectedMemberID] = useState(0);
  const [selectedBookID, setSelectedBookID] = useState(0);

  const [checkoutDateDB, setCheckoutDate] = useState('');
  const [dueDateDB, setDueDate] = useState('');
  const [returnDateDB, setReturnDate] = useState('');

  const API = 'http://classwork.engr.oregonstate.edu:55111';

  // Preloaded values
  const idCheckout = localStorage.getItem('checkout');
  const name = localStorage.getItem('name');
  const title = localStorage.getItem('title');
  const checkoutDate = localStorage.getItem('checkoutDate');
  const dueDate = localStorage.getItem('dueDate');
  const returnDate = localStorage.getItem('returnDate');

  // Helpers
  function formatDateForInput(dateString) {
    if (!dateString) return '';
    const s = String(dateString).toLowerCase();
    if (s === 'none' || s === 'null') return '';
    // Expecting ISO or something Date can parse
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0]; // yyyy-mm-dd for <input type="date">
  }

  function normalizeDateForAPI(value) {
    // Send null instead of '' so backend can treat it as NULL
    return value && value.trim() !== '' ? value : null;
  }

  async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request failed: ${res.status}`);
    }
    return res.json();
  }

  // Load dropdown data
  useEffect(() => {
    (async () => {
      try {
        const [members, books] = await Promise.all([
          fetchJSON(`${API}/fetch_memberIds`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }),
          fetchJSON(`${API}/fetch_bookIds`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }),
        ]);
        setMemberNames(members);
        setBooksTitle(books);
      } catch (e) {
        console.error(e);
        setError(e.message || 'Fetch failed');
      }
    })();
  }, []);

  // Seed initial selected values + dates
  useEffect(() => {
    setSelectedMemberName(name || '');
    setSelectedBookTitle(title || '');
    setCheckoutDate(formatDateForInput(checkoutDate));
    setDueDate(formatDateForInput(dueDate));
    setReturnDate(formatDateForInput(returnDate));
  }, [name, title, checkoutDate, dueDate, returnDate]);

  // Whenever the preselected names exist, resolve their IDs once on mount
  useEffect(() => {
    (async () => {
      try {
        if (selectedMemberName) {
          const data = await fetchJSON(`${API}/get_member_id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: selectedMemberName }),
          });
          if (Array.isArray(data) && data[0]?.idMember) setSelectedMemberID(data[0].idMember);
        }
        if (selectedBookTitle) {
          const data = await fetchJSON(`${API}/get_book_id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: selectedBookTitle }),
          });
          if (Array.isArray(data) && data[0]?.idBook) setSelectedBookID(data[0].idBook);
        }
      } catch (e) {
        console.error(e);
        setError(e.message || 'Lookup failed');
      }
    })();
    // Only run when these specific names change
  }, [selectedMemberName, selectedBookTitle]);

  // Handlers
  async function handleMemberChange(e) {
    const name = e.target.value;
    setSelectedMemberName(name);
    try {
      const data = await fetchJSON(`${API}/get_member_id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setSelectedMemberID(data[0].idMember);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleBookChange(e) {
    const title = e.target.value;
    setSelectedBookTitle(title);
    try {
      const data = await fetchJSON(`${API}/get_book_id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      setSelectedBookID(data[0].idBook);
    } catch (e) {
      setError(e.message);
    }
  }

  async function UpdateQuery(e) {
    e.preventDefault(); // prevent page reload
    setError(null);

    try {
      const body = {
        idCheckout,
        selectedMemberID,
        selectedBookID,
        checkoutDateDB: normalizeDateForAPI(checkoutDateDB),
        dueDateDB: normalizeDateForAPI(dueDateDB),
        returnDateDB: normalizeDateForAPI(returnDateDB),
      };

      await fetchJSON(`${API}/update_row`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log('Everything updated');
      alert('Update successful');
    } catch (e) {
      console.error(e);
      setError(e.message || 'Update failed');
    }
  }

  return (
    <>
      <form onSubmit={UpdateQuery}>
        <h1>Update</h1>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        <label>Member&apos;s name (MemberID)</label>
        <select value={selectedMemberName} onChange={handleMemberChange}>
          <option value="" disabled>Select a member…</option>
          {memberNames.map((m, idx) => (
            <option key={idx} value={m.name}>{m.name}</option>
          ))}
        </select>

        <br />
        <label>Book&apos;s Title (BookID)</label>
        <select value={selectedBookTitle} onChange={handleBookChange}>
          <option value="" disabled>Select a book…</option>
          {booksTitle.map((b, idx) => (
            <option key={idx} value={b.title}>{b.title}</option>
          ))}
        </select>

        <br /> Checkout Date:{' '}
        <input
          type="date"
          id="checkout"
          name="checkout"
          value={checkoutDateDB}
          onChange={(e) => setCheckoutDate(e.target.value)}
        />

        <br /> Due Date:{' '}
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={dueDateDB}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <br /> Return Date:{' '}
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          value={returnDateDB}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <br />
        <button type="submit" className="main-button">Update</button>
      </form>
    </>
  );
}

export default Update;
