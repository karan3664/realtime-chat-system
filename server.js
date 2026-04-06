const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = [];

// Connection event
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // User joins
  socket.on("join", (data) => {
    const user = {
      id: socket.id,
      name: data.name,
      joinedAt: new Date()
    };
    users.push(user);

    // Notify all users
    io.emit("user_joined", {
      message: `${data.name} joined the chat`,
      users: users.map(u => ({ id: u.id, name: u.name })),
      totalUsers: users.length
    });

    console.log(`${data.name} joined. Total users: ${users.length}`);
  });

  // Send message
  socket.on("send_message", (data) => {
    const user = users.find(u => u.id === socket.id);
    const message = {
      id: Date.now(),
      sender: user?.name || "Anonymous",
      text: data.text,
      timestamp: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${user?.name}&background=random`
    };

    // Broadcast to all users
    io.emit("receive_message", message);
    console.log(`Message from ${user?.name}: ${data.text}`);
  });

  // Typing indicator
  socket.on("typing", (data) => {
    const user = users.find(u => u.id === socket.id);
    socket.broadcast.emit("user_typing", {
      name: user?.name,
      isTyping: data.isTyping
    });
  });

  // Get online users
  socket.on("get_users", () => {
    socket.emit("users_list", {
      users: users.map(u => ({ id: u.id, name: u.name })),
      totalUsers: users.length
    });
  });

  // Disconnect event
  socket.on("disconnect", () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      users.splice(users.indexOf(user), 1);

      io.emit("user_left", {
        message: `${user.name} left the chat`,
        users: users.map(u => ({ id: u.id, name: u.name })),
        totalUsers: users.length
      });

      console.log(`✅ ${user.name} disconnected. Total users: ${users.length}`);
    }
  });

  // Error handling
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

console.log("🚀 Chat server running on ws://localhost:3001");
