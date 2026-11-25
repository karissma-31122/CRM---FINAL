import React, { useState } from 'react';
import { makeId } from '../storage';

export default function Leads({ leads, onAdd, onUpdate, onDelete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [editing, setEditing] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!name.trim() || !interest.trim()) return;
    const values = { name: name.trim(), email: email.trim(), interest: interest.trim() };
    if (editing) onUpdate(editing, values);
    else onAdd({ id: makeId(), ...values, status: 'New' });
    setEditing(''); setName(''); setEmail(''); setInterest('');
  }
  function edit(item) {
    setEditing(item.id); setName(item.name); setEmail(item.email); setInterest(item.interest);
  }
  return <><div className="page-heading"><p className="eyebrow">BUSINESS DEVELOPMENT</p><h1>Leads</h1><p>Track prospective customers and their interests.</p></div><section className="panel"><h2>{editing ? 'Edit lead' : 'Add lead'}</h2><form onSubmit={submit}><div className="form-row"><label>Name<input required value={name} onChange={event => setName(event.target.value)} /></label><label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} /></label><label>Interest<input required value={interest} onChange={event => setInterest(event.target.value)} /></label></div><button>{editing ? 'Save changes' : 'Add lead'}</button></form></section><section className="panel"><h2>Lead pipeline</h2><div className="table-wrap"><table><thead><tr><th>Name / email</th><th>Interest</th><th>Status</th><th>Actions</th></tr></thead><tbody>{leads.map(item => <tr key={item.id}><td>{item.name}<br /><small>{item.email}</small></td><td>{item.interest}</td><td><select aria-label={'Status for ' + item.name} value={item.status} onChange={event => onUpdate(item.id, { status: event.target.value })}>{['New','Contacted','Qualified','Converted','Lost'].map(status => <option key={status}>{status}</option>)}</select></td><td><button className="secondary" onClick={() => edit(item)}>Edit</button> <button className="danger" onClick={() => { if (window.confirm('Delete this lead?')) { onDelete(item.id); if (editing === item.id) { setEditing(''); setName(''); setEmail(''); setInterest(''); } } }}>Delete</button></td></tr>)}</tbody></table></div><p className="muted small">Converted is a tracking status; customer registration is separate.</p></section></>;
}
