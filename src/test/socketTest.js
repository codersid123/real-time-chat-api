const { io } = require("socket.io-client");

const SERVER_URL = "http://localhost:5000";

// 🔴 PASTE REAL JWTs FROM LOGIN RESPONSES
const TOKEN_A =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODIzNGQ5NmQxYTY1Y2MwMDNjNWZkMyIsImlhdCI6MTc3MDkxNjU0MywiZXhwIjoxNzcxNTIxMzQzfQ.jJmog_vZ1yr2Pwx7uiqY1B60HNIQjhlozg6ZD8yKz08";
const TOKEN_B =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGUwYmJjN2UxNzNlN2NiNDVlZmFmYyIsImlhdCI6MTc3MDkxNzgwNiwiZXhwIjoxNzcxNTIyNjA2fQ.AcdbbxttThHuqIlwHfkfdXUORIO1iMKf75rXK0s91jI";

// 🔴 PASTE REAL USER IDs FROM DB / LOGIN RESPONSE
const USER_A_ID = "698234d96d1a65cc003c5fd3";
const USER_B_ID = "698e0bbc7e173e7cb45efafc";

const socketA = io(SERVER_URL, {
  auth: { token: TOKEN_A },
  transports: ["websocket"],
});

const socketB = io(SERVER_URL, {
  auth: { token: TOKEN_B },
  transports: ["websocket"],
});

socketA.on("connect", () => {
  console.log("✅ User A connected:", socketA.id);

  // Send message AFTER connection
  socketA.emit("private_message", {
    to: USER_B_ID,
    message: "Hello from User A 👋",
  });
});

socketB.on("connect", () => {
  console.log("✅ User B connected:", socketB.id);
});

socketB.on("private_message", (data) => {
  console.log("📩 User B received:", data);
});

socketA.on("connect_error", (err) => {
  console.error("❌ Socket A error:", err.message);
});

socketB.on("connect_error", (err) => {
  console.error("❌ Socket B error:", err.message);
});
