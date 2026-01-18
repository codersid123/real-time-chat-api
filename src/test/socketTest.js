const { io } = require("socket.io-client");

const SERVER_URL = "http://localhost:5000";

// Fake user IDs
const USER_A = "userA123";
const USER_B = "userB456";

// Create TWO socket connections
const socketA = io(SERVER_URL);
const socketB = io(SERVER_URL);

// When User A connects
socketA.on("connect", () => {
  console.log("User A connected:", socketA.id);

  // Register User A
  socketA.emit("register", USER_A);

  // Send message AFTER both users are connected
  setTimeout(() => {
    socketA.emit("private_message", {
      senderId: USER_A,
      receiverId: USER_B,
      message: "Hello from User A 👋",
    });
  }, 2000);
});

// When User B connects
socketB.on("connect", () => {
  console.log("User B connected:", socketB.id);

  // Register User B
  socketB.emit("register", USER_B);
});

// User B listens for messages
socketB.on("receive_message", (data) => {
  console.log("User B received message:", data);
});
