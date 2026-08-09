# 🧑‍💻 CODIQ

CODIQ is a real-time collaborative coding interview platform — built for conducting technical interviews, pair programming sessions, and solo practice, all in one place. It combines a VSCode-style code editor, live video/audio, real-time chat, and automated code execution with instant pass/fail feedback.

---

## ✨ Highlights

- 🧑‍💻 **VSCode-Powered Code Editor** — Rich, familiar coding experience right in the browser
- 🔐 **Authentication via Clerk** — Secure sign-up/sign-in flows out of the box
- 🎥 **1-on-1 Video Interview Rooms** — Real-time video calling for interviews
- 🧭 **Dashboard with Live Stats** — Track sessions, progress, and activity at a glance
- 🔊 **Mic & Camera Toggle, Screen Sharing & Recording** — Full control over your session
- 💬 **Real-time Chat Messaging** — Communicate alongside the code editor
- ⚙️ **Secure Code Execution in Isolated Environment** — Run code safely, sandboxed
- 🎯 **Auto Feedback — Success / Fail** — Instant results based on test cases
- 🎉 **Confetti on Success + Notifications on Fail** — Fun, responsive feedback loop
- 🧩 **Practice Problems Page** — Solo coding practice mode
- 🔒 **Room Locking** — Restrict rooms to exactly 2 participants
- 🧠 **Background Jobs with Inngest** — Reliable async task processing
- 🧰 **REST API with Node.js & Express** — Clean, scalable backend architecture
- ⚡ **Data Fetching & Caching via TanStack Query** — Fast, efficient client-server sync
- 🤖 **CodeRabbit for PR Analysis & Code Optimization** — Automated code review in CI
- 🧑‍💻 **Git & GitHub Workflow** — Branches, PRs, and merges done the right way
- 🚀 **Deployment on Sevalla** — Free-tier friendly hosting

---

## 🛠️ Tech Stack

| Layer      | Technology                                  |
|------------|----------------------------------------------|
| Frontend   | React (Vite), TanStack Query, VSCode Editor  |
| Backend    | Node.js, Express                             |
| Database   | MongoDB                                      |
| Auth       | Clerk                                        |
| Video/Chat | Stream                                       |
| Background Jobs | Inngest                                |
| Code Review | CodeRabbit                                  |
| Deployment | Sevalla                                      |

---

## 🧪 Environment Variables

### Backend (`/backend/.env`)

```env
PORT=3000
NODE_ENV=development

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (`/frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nischay912/Codiq.git
cd codiq
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app should now be running locally — frontend on `http://localhost:5173` and backend on `http://localhost:3000`.

---

## 📂 Project Structure

```
CODIQ/
├── backend/          # Express REST API, Inngest jobs, DB models
├── frontend/          # React + Vite client app
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👤 Author

Built with ❤️ by **[Nischay Kumar]**

- GitHub: [@Nischay912](https://github.com/Nischay912)
