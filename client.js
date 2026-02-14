const axios = require("axios");
const { io } = require("socket.io-client");

const SERVER_URL = "http://localhost:5000";

async function startClient() {
  // 1️⃣ LOGIN (REST)
  const loginRes = await axios.post(`${SERVER_URL}/api/auth/login`, {
    email: "usera@test.com", // use an existing user
    password: "123456",
  });

  const { token, user } = loginRes.data;

  console.log("✅ Logged in as:", user.email);

  // 2️⃣ SOCKET CONNECT (AUTOMATIC TOKEN)
  const socket = io(SERVER_URL, {
    auth: {
      token: token, // 🔥 AUTOMATIC — NOT MANUAL
    },
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected as user:", user.id);
  });

  socket.on("private_message", (data) => {
    console.log("📩 New message:", data);
  });
}

startClient().catch(console.error);
