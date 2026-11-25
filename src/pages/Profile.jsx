import React, { useState } from 'react';

export default function Profile({ user, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    onUpdate(user.id, { name: name.trim() });
    setMessage('Profile updated.');
  }
  return <><div className="page-heading"><h1>My profile</h1><p>Manage your account information.</p></div><section className="panel profile"><form onSubmit={submit}><label>Name<input readOnly={user.role !== 'Admin'} required value={name} onChange={event => setName(event.target.value)} /></label><label>Email<input value={user.email} readOnly /></label><label>Role<input value={user.role} readOnly /></label>{user.role === 'Admin' && <button>Save profile</button>}{message && <p role="status">{message}</p>}</form></section></>;
}
