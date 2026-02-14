# 📡 Real-Time Chat API

A backend-only real-time chat system built using **Node.js**, **Express**, **MongoDB**, **JWT authentication**, and **Socket.IO**.

This project supports secure one-to-one messaging with persistent storage and real-time delivery.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based stateless authentication
- Protected REST endpoints

### 💬 Real-Time Messaging
- WebSocket-based communication using Socket.IO
- One-to-one private messaging
- Online user tracking
- Offline message persistence

### 🗂 Message Management
- Store messages in MongoDB
- Fetch chat history between two users
- Delete messages
- Message seen status support

---

## 🧠 Architecture Overview

The system follows a layered architecture:

```
Client
 ├── REST Request
 │     → Express Router
 │     → Authentication Middleware
 │     → Controller
 │     → MongoDB
 │     → JSON Response
 │
 └── Socket Connection
       → Handshake Authentication (JWT)
       → Event Handler
       → MongoDB (message persistence)
       → Real-time emit to receiver
```

### Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Real-Time | Socket.IO |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |

---

## 📂 Project Structure

```
src/
 ├── config/
 │    └── db.js
 ├── controllers/
 │    ├── authController.js
 │    └── messageController.js
 ├── middleware/
 │    └── auth.js
 ├── models/
 │    ├── User.js
 │    └── Message.js
 ├── routes/
 │    ├── authRoutes.js
 │    └── messageRoutes.js
 ├── sockets/
 │    └── socket.js
 ├── app.js
 ├── server.js
 └── index.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=mongodb://127.0.0.1:27017/chat_app
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=5000
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository

```
git clone <repository-url>
cd real-time-chat-api
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Ensure MongoDB is running

Start your local MongoDB server.

### 4️⃣ Start the server

```
npm start
```

Or manually:

```
node src/index.js
```

---

## 🔐 REST API Endpoints

### Register

```
POST /api/auth/register
```

Request Body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

### Login

```
POST /api/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "userId",
    "name": "John",
    "email": "john@example.com"
  }
}
```

---

### Get Chat History

```
GET /api/messages/:userId
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Delete Message

```
DELETE /api/messages/:messageId
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔌 WebSocket Events

### 🔐 Socket Authentication

Client connects with JWT:

```javascript
const socket = io("http://localhost:5000", {
  auth: {
    token: "JWT_TOKEN"
  }
});
```

---

### 📤 Send Private Message

Client emits:

```javascript
socket.emit("private_message", {
  to: "receiverUserId",
  message: "Hello"
});
```

---

### 📥 Receive Private Message

Client listens:

```javascript
socket.on("private_message", (data) => {
  console.log(data);
});
```

---

### 👁 Mark Message as Seen

Client emits:

```javascript
socket.emit("message_seen", {
  messageId: "messageId"
});
```

---

## 🛡 Security Considerations

- Passwords are hashed using bcrypt before storage.
- JWT tokens are signed with a secret and have expiration.
- REST routes are protected via authentication middleware.
- Socket connections are authenticated during handshake.
- Sender identity is enforced server-side (never trusted from client).

---

## 🧪 Testing

### REST APIs
Use Postman or any HTTP client to test:
- Registration
- Login
- Fetching chat history
- Deleting messages

### Real-Time Messaging
Use `socket.io-client` to simulate real-time messaging between users.

---

## 📈 Future Improvements

- Group chat support
- Message editing
- Pagination for chat history
- Rate limiting
- Redis integration for horizontal scaling
- Docker containerization

---

## 📌 Summary

This project demonstrates:

- Clean backend architecture
- Stateless JWT authentication
- Real-time communication using Socket.IO
- Secure password handling
- Persistent message storage
- Separation of concerns
- Production-style backend design
