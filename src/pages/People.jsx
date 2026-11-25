import React, { useState } from 'react';
import { makeId } from '../storage';

export default function People({ users, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const address = email.trim().toLowerCase();
    if (!name.trim() || users.some(item => item.email === address)) { setError('Enter a name and a unique email.'); return; }
    onRegister({ id: makeId(), name: name.trim(), email: address, password, role: 'Employee' });
    setName(''); setEmail(''); setPassword(''); setError('');
  }
  return <><div className="page-heading"><p className="eyebrow">RELATIONSHIPS</p><h1>Employees</h1><p>Manage the people who receive and provide services.</p></div><section className="panel"><h2>Add employee</h2><form onSubmit={submit}><div className="form-row"><label>Name<input required value={name} onChange={event => setName(event.target.value)} /></label><label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} /></label><label>Password<input required minLength={6} type="password" value={password} onChange={event => setPassword(event.target.value)} /></label></div>{error && <p className="error">{error}</p>}<button>Add employee</button></form></section><section className="panel"><h2>People directory</h2><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>{users.filter(item => item.role === 'Employee').map(item => <tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td>{item.role}</td></tr>)}</tbody></table></div></section></>;
}
