import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  const isAdmin = user.role === 'Admin';
  const isCustomer = user.role === 'Customer';
  const role = isAdmin ? 'Administrator' : isCustomer ? 'Customer' : 'User / Employee';

  return (
    <header className="header">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-logo">C</div>
          <div className="brand">
            Client<span>Pilot</span>
            <small>CUSTOMER RELATIONSHIP MANAGEMENT</small>
          </div>
        </div>
        <div className="account">
          <span className="role-label">{role}</span>
          <div className="account-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="account-info">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          <button className="secondary" onClick={onLogout}>Sign out</button>
        </div>
      </div>
      <nav className="dashboard-nav" aria-label="Dashboard navigation">
        <NavLink to="/dashboard">Dashboard</NavLink>
        {!isCustomer && <NavLink to="/customers">{isAdmin ? 'Customers' : 'My customers'}</NavLink>}
        <NavLink to="/requests">{isCustomer ? 'My requests' : 'Service requests'}</NavLink>
        {isAdmin && <NavLink to="/leads">Leads</NavLink>}
        {!isCustomer && <NavLink to="/followups">Follow-ups</NavLink>}
        {isAdmin && <NavLink to="/people">Employees</NavLink>}
        <NavLink to="/messages">Messages</NavLink>
        <NavLink to="/feedback">Feedback</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}
