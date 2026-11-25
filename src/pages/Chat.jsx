import React, { useState } from 'react';
import { makeId } from '../storage';

export default function Chat({ user, users, messages, onSend }) {
  const [recipient, setRecipient] = useState('');
  const [text, setText] = useState('');
  const contacts = users.filter(person => person.id !== user.id && (user.role === 'Admin' || person.role === 'Admin' || (user.role === 'Employee' && person.employeeId === user.id) || (user.role === 'Customer' && person.id === user.employeeId)));
  const active = contacts.find(person => person.id === recipient);
  const conversation = messages.filter(item => (item.from === user.id && item.to === recipient) || (item.from === recipient && item.to === user.id));
  function send(event) {
    event.preventDefault();
    if (!active || !text.trim()) return;
    onSend({ id: makeId(), from: user.id, to: recipient, text: text.trim(), date: new Date().toISOString() });
    setText('');
  }
  return <><div className="page-heading"><h1>Messages</h1><p>Communicate with your customer service contacts.</p></div><section className="panel"><label>Choose contact<select value={recipient} onChange={event => setRecipient(event.target.value)}><option value="">Select a contact</option>{contacts.map(person => <option key={person.id} value={person.id}>{person.name} ({person.role})</option>)}</select></label>
    {active && <><div className="chat-history">{conversation.length === 0 && <p>No messages yet.</p>}{conversation.map(item => <div key={item.id} className={'chat-bubble ' + (item.from === user.id ? 'mine' : '')}><strong>{item.from === user.id ? 'You' : active.name}</strong><p>{item.text}</p><small>{new Date(item.date).toLocaleString()}</small></div>)}</div><form onSubmit={send}><label>Message<textarea required value={text} onChange={event => setText(event.target.value)} /></label><button>Send message</button></form></>}
  </section></>;
}
