# NeuroChat 🤖

NeuroChat is a full-stack AI-powered chatbot application that enables users to interact with an intelligent conversational assistant while maintaining multiple chat threads. The application provides persistent conversation storage, thread management, and seamless AI interactions using the Groq API.

---

## 📌 Overview

NeuroChat was built to simulate the experience of modern AI assistants such as ChatGPT. Users can create multiple conversations, switch between chat threads, rename conversations, delete unwanted chats, and continue previous discussions without losing context.

The application combines a React frontend, Express backend, MongoDB database, and Groq's Large Language Model API to deliver a responsive and scalable AI chat experience.

---

## ✨ Features

### 🤖 AI-Powered Conversations

* Integrated Groq API for generating intelligent responses.
* Real-time AI interaction with low response latency.

### 💬 Multi-Thread Chat Management

* Create unlimited conversation threads.
* Switch between previous conversations.
* Continue existing discussions without losing history.

### 📝 Thread Operations

* Rename conversation threads.
* Delete unwanted threads.
* Automatically store thread metadata.

### 💾 Persistent Storage

* Store conversations in MongoDB Atlas.
* Retrieve previous chats even after refreshing the application.
* Maintain chat history across sessions.

### ⚡ Dynamic User Experience

* Real-time chat updates.
* Responsive sidebar navigation.
* Active thread highlighting.
* Context-based state management using React Context API.

---

## 🏗️ System Architecture

Frontend (React.js)

↓ REST API Calls

Backend (Node.js + Express.js)

↓ Database Operations

MongoDB Atlas

↓ AI Responses

Groq API

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Context API
* CSS3
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### AI Integration

* Groq API

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```
NeuroChat
│
├── Backend
│   ├── models
│   │   └── Thread.js
│   ├── routes
│   │   └── chat.js
│   ├── utils
│   │   └── groq.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Chat.jsx
│   │   └── MyContext.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/rutujakhade23/NeuroChat.git
cd NeuroChat
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=8000
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Get All Threads

```http
GET /api/thread
```

### Get Single Thread

```http
GET /api/thread/:threadId
```

### Create Chat Response

```http
POST /api/chat
```

### Rename Thread

```http
PUT /api/thread/:threadId
```

### Delete Thread

```http
DELETE /api/thread/:threadId
```

---

## Key Learnings

* Building RESTful APIs using Express.js
* Managing application-wide state using React Context API
* Integrating Large Language Model APIs
* Designing MongoDB schemas using Mongoose
* Implementing CRUD operations in full-stack applications
* Handling asynchronous operations and API communication

---

## Future Enhancements

* User Authentication (JWT)
* Light/Dark Theme Toggle
* Voice Input Support
* Markdown Rendering
* Code Block Syntax Highlighting
* Deployment on Vercel and Render
* User-Specific Chat Histories

---

## Author

**Rutuja Khade**

GitHub: https://github.com/rutujakhade23

LinkedIn: https://www.linkedin.com/in/rutuja-khade-86a730316/

---

⭐ If you found this project useful, consider giving it a star on GitHub.
