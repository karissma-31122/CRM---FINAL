import React, { useState } from 'react';
import { statuses } from '../data';
import { makeId } from '../storage';

function RequestCard({ item, user, users, onUpdate, onDelete }) {
  const [response, setResponse] = useState(item.response);
  const [followUp, setFollowUp] = useState(item.followUp);
  const [feedback, setFeedback] = useState(item.feedback);
  const [rating, setRating] = useState(item.rating || '5');
  const staff = user.role !== 'Customer';
  const employee = users.find(person => person.id === item.employeeId);
  const customer = users.find(person => person.id === item.customerId);
  return (
    <article className="panel request-card">
      <div className="section-heading"><div><p className="eyebrow">{item.category}</p><h3>{item.title}</h3></div><span className={'status ' + item.status.toLowerCase().replace(' ', '-')}>{item.status}</span></div>
      <p>{item.description}</p>
      <p className="muted small">Customer: {customer?.name || 'Unknown'} · Assigned to: {employee?.name || 'Not assigned'}</p>

      {staff && <form onSubmit={event => { event.preventDefault(); onUpdate(item.id, { response, followUp }); }}>
        <label>Status<select value={item.status} onChange={event => onUpdate(item.id, { status: event.target.value })}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label>
        <label>Reply to customer<textarea value={response} onChange={event => setResponse(event.target.value)} /></label>
        <label>Follow-up date<input type="date" value={followUp} onChange={event => setFollowUp(event.target.value)} /></label>
        <button type="submit">Save reply and follow-up</button>
      </form>}
      {!staff && <div className="message"><strong>Team response</strong><p>{item.response || 'Your request is awaiting a response.'}</p>{item.followUp && <p>Next follow-up: {item.followUp}</p>}</div>}
      {item.feedback && <p className="message"><strong>Customer feedback · {item.rating}/5</strong><br />{item.feedback}</p>}
      {!staff && item.status === 'Resolved' && <form onSubmit={event => { event.preventDefault(); onUpdate(item.id, { feedback: feedback.trim(), rating }); }}><label>Rating<select value={rating} onChange={event => setRating(event.target.value)}>{[5,4,3,2,1].map(number => <option key={number}>{number}</option>)}</select></label><label>Feedback<textarea required value={feedback} onChange={event => setFeedback(event.target.value)} /></label><button type="submit">Submit feedback</button></form>}
      {user.role === 'Admin' && <button className="danger" onClick={() => { if (window.confirm('Delete this request?')) onDelete(item.id); }}>Delete request</button>}
    </article>
  );
}

export default function Requests({ user, users, requests, onCreate, onUpdate, onDelete, feedbackOnly }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Service');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const visible = requests.filter(item => (filter === 'All' || item.status === filter) && item.title.toLowerCase().includes(search.toLowerCase()));

  function submit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onCreate({ id: makeId(), customerId: user.id, title: title.trim(), category, description: description.trim(), employeeId: user.employeeId || '', status: 'New', response: '', feedback: '', rating: '', followUp: '' });
    setTitle('');
    setDescription('');
    setFilter('All');
    setSearch('');
  }

  return (
    <><div className="page-heading"><p className="eyebrow">CUSTOMER SERVICE</p><h1>{user.role === 'Customer' ? 'My requests' : 'Service requests'}</h1><p>Track enquiries, complaints, responses and customer satisfaction.</p></div>
      {user.role === 'Customer' && !feedbackOnly && <section className="panel"><h2>Create a request</h2><form onSubmit={submit}><div className="form-row"><label>Subject<input required value={title} onChange={event => setTitle(event.target.value)} /></label><label>Type<select value={category} onChange={event => setCategory(event.target.value)}><option>Service</option><option>Complaint</option><option>Enquiry</option></select></label></div><label>Description<textarea required value={description} onChange={event => setDescription(event.target.value)} /></label><button type="submit">Submit request</button></form></section>}
      <div className="toolbar"><input aria-label="Search requests" placeholder="Search requests..." value={search} onChange={event => setSearch(event.target.value)} /><select aria-label="Filter status" value={filter} onChange={event => setFilter(event.target.value)}><option>All</option>{statuses.map(status => <option key={status}>{status}</option>)}</select></div>
      <div className="request-grid">{visible.map(item => <RequestCard key={item.id} item={item} user={user} users={users} onUpdate={onUpdate} onDelete={onDelete} />)}</div>
      {!visible.length && <section className="panel muted">No matching requests.</section>}
    </>
  );
}
