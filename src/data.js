// Sample records for the classroom demonstration.
export const initialUsers = [
  { id: 'a1', name: 'Arjun Mehta', email: 'arjun.mehta@clientpilot.com', title: 'Executive Director', password: 'admin123', role: 'Admin' },
  { id: 'a2', name: 'Kavita Nair', title: 'Head of Operations', email: 'kavita.nair@clientpilot.com', password: 'admin123', role: 'Admin' },
  { id: 'a3', name: 'Rohit Verma', title: 'Lead Systems & Security', email: 'rohit.verma@clientpilot.com', password: 'admin123', role: 'Admin' },
  { id: 'e1', name: 'Priya Sharma', email: 'user@clientpilot.com', password: 'user123', role: 'Employee' },
  { id: 'c1', name: 'Apex Financial', email: 'customer@clientpilot.com', password: 'customer123', role: 'Customer', employeeId: 'e1', company: 'Apex Financial', phone: '' }
];

export const initialRequests = [
  { id: 'r1', customerId: 'c1', title: 'Website redesign', category: 'Service', description: 'Update our company website.', employeeId: 'e1', status: 'In progress', response: 'Design work has started.', feedback: '', rating: '', followUp: '' },
  { id: 'r2', customerId: 'c1', title: 'Account assistance', category: 'Complaint', description: 'Need help with account access.', employeeId: 'e1', status: 'New', response: '', feedback: '', rating: '', followUp: '' }
];

export const initialLeads = [
  { id: 'l1', name: 'MediCore Healthcare', email: 'contact@example.com', interest: 'Website development', status: 'New' }
];

export const statuses = ['New', 'Assigned', 'In progress', 'Resolved'];
