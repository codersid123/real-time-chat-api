## Real-Time Chat API
A backend service for one-to-one real-time messaging using
Node.js, Express, Socket.IO, MongoDB, and JWT authentication.

### Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- JWT Authentication

### Features
- User registration & login
- JWT-based authentication
- Real-time private messaging
- Message persistence
- Chat history with pagination
- Message deletion (soft delete)
- Read receipts (optional)

### Setup
git clone https://github.com/your-username/real-time-chat-api.git
cd real-time-chat-api
npm install

### Environment Variables
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

### Run Server
npm run dev

### API Documentation
POST /api/auth/register
POST /api/auth/login
GET  /api/messages/:userId
DELETE /api/messages/:messageId

### WebSocket Events
connect
private_message
message_seen
