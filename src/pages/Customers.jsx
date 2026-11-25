import React, { useState } from 'react';
import { makeId } from '../storage';

const empty = { name: '', email: '', phone: '', company: '', employeeId: '', password: '' };

export default function Customers({ user, users, requests, onSave, onDelete }) {
  const admin = user.role === 'Admin';
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const customers = users.filter(person => person.role === 'Customer' && (admin || person.employeeId === user.id));
  const employees = users.filter(person => person.role === 'Employee');
  const visible = customers.filter(person => (person.name + ' ' + person.email + ' ' + (person.company || '')).toLowerCase().includes(search.toLowerCase()));
  const detail = customers.find(person => person.id === selected);

  function field(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!form.name.trim() || users.some(person => person.email === email && person.id !== form.id)) {
      setError('Enter a name and a unique email.');
      return;
    }
    onSave({ ...form, id: form.id || makeId(), email, name: form.name.trim(), role: 'Customer' });
    setForm(null);
  }

  return <>
    <div className="page-heading"><h1>{admin ? 'Customer management' : 'Assigned customers'}</h1><p>Customer contacts, assignments and service history.</p></div>
    <section className="panel">
      <div className="section-heading"><input placeholder="Search customers" value={search} onChange={event => setSearch(event.target.value)} />
        {admin && <button onClick={() => { setForm({ ...empty }); setError(''); }}>+ Add customer</button>}
      </div>
      <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Company</th><th>Assigned employee</th><th>Actions</th></tr></thead><tbody>
        {visible.map(person => <tr key={person.id}><td>{person.name}</td><td>{person.email}</td><td>{person.company || '—'}</td><td>{employees.find(item => item.id === person.employeeId)?.name || 'Unassigned'}</td><td>
          <button className="secondary" onClick={() => setSelected(person.id)}>View</button>{' '}
          {admin && <><button className="secondary" onClick={() => { setForm({ ...empty, ...person }); setError(''); }}>Edit / Assign</button>{' '}<button className="danger" onClick={() => { if (window.confirm('Delete customer and their requests and messages?')) onDelete(person.id); }}>Delete</button></>}
        </td></tr>)}
      </tbody></table></div>
      {!visible.length && <p>No customers found.</p>}
    </section>
    {admin && form && <section className="panel"><h2>{form.id ? 'Edit / assign customer' : 'Add customer'}</h2><form onSubmit={submit}>
      <div className="form-row"><label>Name<input name="name" required value={form.name} onChange={field} /></label><label>Email<input name="email" type="email" required value={form.email} onChange={field} /></label><label>Phone<input name="phone" value={form.phone} onChange={field} /></label><label>Company<input name="company" value={form.company} onChange={field} /></label></div>
      {!form.id && <label>Demo password<input name="password" type="password" required minLength={6} value={form.password} onChange={field} /></label>}
      <label>Assign employee<select name="employeeId" value={form.employeeId} onChange={field}><option value="">Unassigned</option>{employees.map(person => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label>
      {error && <p className="error">{error}</p>}<button>Save customer</button>{' '}<button type="button" className="secondary" onClick={() => setForm(null)}>Cancel</button>
    </form></section>}
    {detail && <section className="panel"><div className="section-heading"><h2>{detail.name} — Customer details</h2><button className="secondary" onClick={() => setSelected(null)}>Close</button></div><p>Email: {detail.email}</p><p>Phone: {detail.phone || 'Not provided'}</p><p>Company: {detail.company || 'Not provided'}</p><h3>Service history</h3>{requests.filter(item => item.customerId === detail.id).map(item => <p key={item.id}>{item.title} · {item.status} · {item.feedback || 'No feedback'}</p>)}</section>}
  </>;
}
