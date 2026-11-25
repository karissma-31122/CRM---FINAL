# ClientPilot — CRM Final

Frontend classroom prototype using HTML, CSS, JavaScript, React, React Router and Local Storage.

## Run

npm install
npm run dev

## Predefined accounts

| Role | Email | Password |
|---|---|---|
| Arjun Mehta | arjun.mehta@clientpilot.com | admin123 |
| Kavita Nair | kavita.nair@clientpilot.com | admin123 |
| Rohit Verma | rohit.verma@clientpilot.com | admin123 |
| User / Employee | user@clientpilot.com | user123 |
| Customer | customer@clientpilot.com | customer123 |

## Demonstration checklist (run in one browser)

1. Sign in as admin. Open Customers, add a sample customer with a unique email and password, view, edit and assign to Priya Sharma.
2. Sign out; sign in as employee. Open My customers and check the assigned customer. No edit or delete buttons should appear.
3. Sign out; sign in as the new customer. Submit a service request and send a message to the assigned employee.
4. Sign in as employee, read and reply to the message, update the service request to Resolved and save a follow-up.
5. Sign in as customer, read reply and submit feedback. Refresh to check persistence.
6. Sign in as admin, open Feedback, verify the record, then delete the test customer. Verify related requests and messages are removed.
7. Test invalid password, wrong role, duplicate signup email, logout and dashboard navigation.

## Source files

- main.jsx: starts React with BrowserRouter.
- App.jsx: shared state, role restrictions, routes and CRUD callbacks.
- data.js: sample accounts and requests.
- storage.js: JSON conversion and Local Storage.
- components/Header.jsx: role-based navigation.
- components/StatCard.jsx: clickable dashboard metrics.
- pages/Auth.jsx: login and customer registration.
- pages/Customers.jsx: customer CRUD, assignment, search and history.
- pages/People.jsx: employee creation and directory.
- pages/Requests.jsx: requests, service status, follow-ups and feedback.
- pages/Chat.jsx: persistent role-based messages.
- pages/Leads.jsx: lead CRUD.
- pages/Dashboard.jsx: computed counts.
- style.css: common design, layouts and responsive rules.

## Limitations

Only demo data should be used. Credentials and records are stored in browser Local Storage, not a secure backend. Chat is demonstrated by switching accounts in the same browser; it is not networked or live across devices. Separate origins have separate data. Follow-ups use dates on requests rather than a separate appointment calendar. Reports are dashboard counts and feedback records. Dashboard cards open relevant pages, not necessarily a prefiltered list. This revision uses a new storage prefix to avoid old demo account conflicts. npm installation and browser execution could not be verified in the creation environment.

## Deployment

Create a GitHub repository, then git init, git add ., git commit -m "Final CRM", git branch -M main, git remote add origin YOUR_REPO_URL, git push -u origin main. Import the repository into Vercel, choose Vite, build command npm run build, output dist, deploy. vercel.json supports router refreshes.
