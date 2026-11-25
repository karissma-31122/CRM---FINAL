import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';

export default function Dashboard({ user, requests, users, leads }) {
  const resolved = requests.filter(item => item.status === 'Resolved').length;
  const rated = requests.filter(item => item.rating);
  const average = rated.length ? (rated.reduce((sum, item) => sum + Number(item.rating), 0) / rated.length).toFixed(1) : '—';
  return (
    <>
      <section className="welcome"><div><p className="eyebrow">{user.role.toUpperCase()} WORKSPACE</p><h1>Welcome, {user.name}</h1><p>Here is your customer service overview.</p></div><Link className="button" to="/requests">{user.role === 'Customer' ? 'Request a service' : 'Manage requests'}</Link></section>
      <div className="stats-grid">
        {user.role !== 'Customer' && <StatCard to="/customers" title={user.role === 'Admin' ? 'Total customers' : 'Assigned customers'} value={users.filter(item => item.role === 'Customer' && (user.role === 'Admin' || item.employeeId === user.id)).length} detail="Customer directory" />}
        <StatCard title="Total requests" value={requests.length} detail="Services and complaints" />
        <StatCard title="Open requests" value={requests.length - resolved} detail="Awaiting resolution" />
        <StatCard title="Resolved" value={resolved} detail="Completed requests" />
        <StatCard to="/feedback" title="Average rating" value={average} detail="Customer feedback / 5" />
      </div>
      {user.role === 'Admin' && <div className="stats-grid"><StatCard to="/people" title="Employees" value={users.filter(item => item.role === 'Employee').length} detail="Service team" /><StatCard to="/leads" title="Leads" value={leads.length} detail="Potential customers" /></div>}
      <section className="panel"><div className="section-heading"><h2>Recent requests</h2><Link to="/requests">View all</Link></div>
        {requests.length === 0 ? <p className="muted">No requests yet.</p> : <div className="table-wrap"><table><thead><tr><th>Request</th><th>Type</th><th>Status</th></tr></thead><tbody>{requests.slice(-5).reverse().map(item => <tr key={item.id}><td>{item.title}</td><td>{item.category}</td><td><span className={'status ' + item.status.toLowerCase().replace(' ', '-')}>{item.status}</span></td></tr>)}</tbody></table></div>}
      </section>
    </>
  );
}
