# ✨ JobQuest (Job Applications Tracker) ✨

A full-stack job applications tracking system with a modern and responsive UI, powerful backend, and data visualization. Track your applied jobs, visualize progress, and manage your job search effortlessly.

## 🔗 Live Demo
🌐 [https://job-applications-tracker-ui.vercel.app/login](https://job-applications-tracker-ui.vercel.app/login) 

🚀 Features

- 🔐 Secure JWT-based authentication with bcrypt password hashing
- 📋 Full CRUD operations for job entries using RESTful APIs
- 🗂️ Filter, search (by position/company), and sort job applications
- 📊 Dashboard with real-time summaries and interactive pie chart visualization
- 📎 Export job data to Excel or PDF
- 💬 Toast notifications for better UX feedback
- 💡 Modal confirmation before deletion
- 🖼️ View jobs in table or card layout
- 🌈 Modern and responsive UI with Tailwind CSS

⚙️ Tech Stack

- Frontend: React.js, Tailwind CSS, Vite
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT + bcrypt
- Visualization: Recharts
- Export: react-csv and jsPDF + jsPDF-AutoTable

### Setup .env file

Create a `.env` file inside the `Backend` directory with the following content:

```js
MONGODB_CONN=...
PORT=8082
JWT_SECRET=...
```

### How to Run Backend Locally

```shell
cd Backend
npm install
npm run dev
```

### How to Run Frontend Locally

```shell
cd Frontend
npm install
npm run dev
```

## 👨‍💻 Author

**Prajwal Tarpe**  
[🔗 LinkedIn](https://www.linkedin.com/in/prajwal-tarpe/) • [💻 GitHub](https://github.com/prajwal-tarpe)
