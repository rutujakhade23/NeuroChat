# 🧠 NeuroChat

NeuroChat is a full-stack AI-powered chatbot that provides intelligent conversations with persistent chat history, secure user authentication, and real-time AI responses. It is built using the MERN stack and integrates the Groq API for fast AI inference.

## 🚀 Live Demo

🌐 Frontend: https://neuro-chat-six.vercel.app/register

## ✨ Features

* 🔐 User Registration & Login using JWT Authentication
* 💬 AI-powered conversations using Groq API
* 📝 Persistent chat history stored in MongoDB
* 📂 Multiple chat threads
* ✏️ Rename and delete conversations
* 🌐 Web search support for current information
* 📱 Responsive modern UI
* ⚡ Fast backend with Express.js
* ☁️ Cloud deployment using Vercel and Render

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* CSS
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Groq API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

```
NeuroChat/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/rutujakhade23/NeuroChat.git
cd NeuroChat
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Backend requires:

```
MONGODB_URI
JWT_SECRET
GROQ_API_KEY
PORT
```

## 👩‍💻 Author

**Rutuja Khade**

GitHub: https://github.com/rutujakhade23

LinkedIn: LinkedIn: https://www.linkedin.com/in/rutuja-khade-86a730316/

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.




---

