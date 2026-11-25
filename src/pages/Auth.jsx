import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialUsers } from '../data';
import { makeId } from '../storage';

export default function Auth({ users, onLogin, onRegister }) {
  const [role, setRole] = useState('Admin');
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    const address = email.trim().toLowerCase();
    if (signup) {
      if (!name.trim() || password.length < 6) {
        setError('Enter a name and at least 6 password characters.');
        return;
      }
      if (users.some(user => user.email === address)) {
        setError('This email is already registered.');
        return;
      }
      const newUser = { id: makeId(), name: name.trim(), email: address, password, role: 'Customer' };
      onRegister(newUser);
      onLogin(newUser.id);
    } else {
      const user = users.find(item => item.email === address && item.password === password && item.role === role);
      if (!user) {
        setError('Incorrect email, password or role.');
        return;
      }
      onLogin(user.id);
    }
    navigate('/dashboard');
  }

  function chooseRole(value) {
    setRole(value);
    setSignup(false);
    setError('');
    setEmail('');
    setPassword('');
  }

  function selectAdmin(admin) {
    setEmail(admin.email);
    setPassword(admin.password);
    setError('');
  }

  return (
    <main className="auth-layout">
      <section className="auth-intro">
        <div className="brand">Client<span>Pilot</span><small>CRM WORKSPACE</small></div>
        <p className="eyebrow">CUSTOMER RELATIONSHIP MANAGEMENT</p>
        <h1>Better service.<br />Stronger relationships.</h1>
        <p>Manage the entire customer journey, from initial enquiry to service delivery and feedback.</p>
        <div className="intro-step">01 · Customers request services</div>
        <div className="intro-step">02 · Teams resolve requests</div>
        <div className="intro-step">03 · Customers share feedback</div>
      </section>
      <section className="auth-panel panel">
        <p className="eyebrow">WELCOME TO CLIENTPILOT</p>
        <h2>{signup ? 'Create customer account' : 'Sign in to your workspace'}</h2>
        <div className="role-tabs">
          {['Admin', 'Employee', 'Customer'].map(item => <button key={item} className={role === item ? 'selected' : 'secondary'} onClick={() => chooseRole(item)}>{item === 'Employee' ? 'User / Employee' : item}</button>)}
        </div>
        {role === 'Admin' && (
          <div className="admin-picker">
            <p className="eyebrow">AUTHORIZED ADMINISTRATORS</p>
            {initialUsers.filter(item => item.role === 'Admin').map(admin => (
              <button type="button" key={admin.id}
                className={'admin-choice ' + (email === admin.email ? 'chosen' : '')}
                onClick={() => selectAdmin(admin)}>
                <span className="admin-initials">{admin.name.split(' ').map(part => part[0]).join('')}</span>
                <span><strong>{admin.name}</strong><small>{admin.title}</small></span>
                <span className="admin-indicator">{email === admin.email ? '✓' : '›'}</span>
              </button>
            ))}
          </div>
        )}
        <form onSubmit={submit}>
          {signup && <label>Name or company<input required value={name} onChange={event => setName(event.target.value)} /></label>}
          <label>Email<input type="email" required placeholder={role === 'Employee' ? 'name@clientpilot.com' : 'Enter your email'} value={email} onChange={event => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
          {error && <p className="error" role="alert">{error}</p>}
          <button type="submit">{signup ? 'Register' : 'Sign in as ' + role}</button>
        </form>
        {role === 'Customer' && <button className="text-button" onClick={() => { setSignup(!signup); setError(''); }}>{signup ? 'Already registered? Sign in' : 'New customer? Create account'}</button>}
        <p className="muted small">ClientPilot · Customer Relationship Management</p>
      </section>
    </main>
  );
}
