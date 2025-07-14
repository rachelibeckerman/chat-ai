# 🧠 Chat-AI

**Chat-AI** is a simple chatbot web application built with **React + Vite + TypeScript** on the frontend and **Node.js + Express** on the backend.  
It uses a cloud-based AI API to generate real-time chat responses.

The frontend is styled using **Tailwind CSS**, and communication with the backend is done via `fetch`.

---

## 🚀 Features

- Real-time chatbot interface
- Clean React + TypeScript client using Vite
- Backend with Express handling API requests
- Tailwind CSS styling
- Communication via REST API (`fetch`)
- Chat history stored in memory (basic example)

---

### 🎯 AI Behavior Control (Up-Front Iterations)

This project supports "up-front iterations" by allowing you to define a system-level instruction before the conversation starts.  
This system prompt is used to guide the AI's behavior, tone, and purpose during the session.

Example system prompt:
> "You are a helpful assistant who always replies concisely."

This feature is implemented via a `"system"` role message in the chat history.

---

## 🛠 Technologies

### Client:
- React
- Vite
- TypeScript
- Tailwind CSS
- Fetch API

### Server:
- Node.js
- Express
- dotenv
- CORS
- AI API via SDK

---

## 📁 Folder Structure

```
chat-ai/
├── client/     → React + Tailwind frontend
└── server/     → Express backend with API connection
```

---

## ⚙️ Getting Started

### 1. Clone the repo:

```bash
git clone https://github.com/your-username/chat-ai.git
cd chat-ai
```

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
OPENAI_API_KEY=your_api_key_here
```

Start the server:

```bash
node chat.js
```

### 3. Setup the client

```bash
cd ../client
npm install
npm run dev
```

---




