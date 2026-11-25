import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import People from './pages/People';
import Leads from './pages/Leads';
import Profile from './pages/Profile';
import Customers from './pages/Customers';
import Chat from './pages/Chat';
import { initialUsers, initialRequests, initialLeads } from './data';
import { readData, saveData } from './storage';

export default function App() {
  // Shared state: the parent component owns the application data.
  const [users, setUsers] = useState(() => {
    const savedUsers = readData('users', initialUsers);
    const admins = initialUsers.filter(item => item.role === 'Admin');
    return [...admins, ...savedUsers.filter(item => item.role !== 'Admin')];
  });
  const [requests, setRequests] = useState(() => readData('requests', initialRequests));
  const [leads, setLeads] = useState(() => readData('leads', initialLeads));
  const [userId, setUserId] = useState(() => readData('session', null));
  const [messages, setMessages] = useState(() => readData('messages', []));
  useEffect(() => { saveData('messages', messages); }, [messages]);
  const navigate = useNavigate();

  // Save changes automatically whenever state changes.
  useEffect(() => { saveData('users', users); }, [users]);
  useEffect(() => { saveData('requests', requests); }, [requests]);
  useEffect(() => { saveData('leads', leads); }, [leads]);
  useEffect(() => { saveData('session', userId); }, [userId]);

  const user = users.find(item => item.id === userId);

  function logout() {
    setUserId(null);
    navigate('/login');
  }

  function register(newUser) {
    setUsers(previous => [...previous, newUser]);
  }

  function updateUser(id, changes) {
    setUsers(previous => previous.map(item => item.id === id ? { ...item, ...changes } : item));
  }

  function saveCustomer(person) {
    if (user.role !== 'Admin') return;
    if (users.some(item => item.id === person.id)) updateUser(person.id, person);
    else register(person);
    setRequests(previous => previous.map(item => item.customerId === person.id ? { ...item, employeeId: person.employeeId } : item));
  }

  function deleteCustomer(id) {
    if (user.role !== 'Admin') return;
    setUsers(previous => previous.filter(item => item.id !== id));
    setRequests(previous => previous.filter(item => item.customerId !== id));
    setMessages(previous => previous.filter(item => item.from !== id && item.to !== id));
  }

  function updateRequest(id, changes) {
    setRequests(previous => previous.map(item => item.id === id ? { ...item, ...changes } : item));
  }

  function updateLead(id, changes) {
    setLeads(previous => previous.map(item => item.id === id ? { ...item, ...changes } : item));
  }

  // Users see only the records belonging to their role.
  const visibleRequests = requests.filter(item => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    if (user.role === 'Employee') return users.find(person => person.id === item.customerId)?.employeeId === user.id;
    return item.customerId === user.id;
  });

  if (!user) {
    return <Routes><Route path="/login" element={<Auth users={users} onLogin={setUserId} onRegister={register} />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
  }

  return (
    <div className="app-shell">
      <Header user={user} onLogout={logout} />
      <main className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} requests={visibleRequests} users={users} leads={leads} />} />
          <Route path="/requests" element={<Requests user={user} users={users} requests={visibleRequests} onCreate={item => setRequests(previous => [...previous, item])} onUpdate={updateRequest} onDelete={id => setRequests(previous => previous.filter(item => item.id !== id))} />} />
          <Route path="/people" element={user.role === 'Admin' ? <People users={users} onRegister={register} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/leads" element={user.role === 'Admin' ? <Leads leads={leads} onAdd={item => setLeads(previous => [...previous, item])} onUpdate={updateLead} onDelete={id => setLeads(previous => previous.filter(item => item.id !== id))} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/customers" element={user.role !== 'Customer' ? <Customers user={user} users={users} requests={visibleRequests} onSave={saveCustomer} onDelete={deleteCustomer} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/messages" element={<Chat user={user} users={users} messages={messages} onSend={item => setMessages(previous => [...previous, item])} />} />
          <Route path="/followups" element={user.role !== 'Customer' ? <Requests user={user} users={users} requests={visibleRequests.filter(item => item.followUp)} onUpdate={updateRequest} onDelete={id => setRequests(previous => previous.filter(item => item.id !== id))} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/feedback" element={<Requests user={user} users={users} requests={visibleRequests.filter(item => item.rating)} onUpdate={updateRequest} onDelete={id => setRequests(previous => previous.filter(item => item.id !== id))} feedbackOnly />} />
          <Route path="/profile" element={<Profile user={user} onUpdate={(id, changes) => { if (user.role === 'Admin') updateUser(id, changes); }} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
