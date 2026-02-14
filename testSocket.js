const { io } = require("socket.io-client");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmRkMmMxNTFmZDY0ODg0NjY4ZWIxNiIsImlhdCI6MTc2ODgwNTA4NywiZXhwIjoxNzY5NDA5ODg3fQ.cVgleZOZC4zpEc3na3Z9wELVMJGqvJXcjNCgr6LBB0A";

const socket = io("http://localhost:5000", {
  auth: {
    token: TOKEN,
  },
  transports: ["websocket"], //forces the websocket to skip polling
});

socket.on("connect", () => {
  console.log("Connected to socket server");
  console.log("Socket ID: ", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket error: ", err.message);
});

socket.on("private_message", (data) => {
  console.log("Message received: ", data);
});
