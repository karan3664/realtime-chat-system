# 💬 Real-time Chat System

A production-ready, real-time chat application using WebSockets (Socket.io) for instant messaging and live user presence.

## ✨ Features

✅ **Real-time Messaging** - Instant message delivery across all connected users
✅ **User Presence** - See who's online in real-time
✅ **Typing Indicator** - Know when others are typing
✅ **Join/Leave Notifications** - System messages for user activity
✅ **User Avatars** - Auto-generated avatars for each user
✅ **Timestamps** - Message timestamps for context
✅ **Smooth Animations** - Beautiful UI with transitions
✅ **Responsive Design** - Works on desktop and mobile

## 🛠 Tech Stack

- **Backend**: Node.js, Socket.io
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Communication**: WebSockets
- **Real-time**: Socket.io events

## 📂 Project Structure

```
realtime-chat-system/
├── server.js
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

Server will run on `ws://localhost:3001`

### 3. Open Chat Application

Open `index.html` in your browser (or use a local server).

## 🎯 How It Works

1. **User Joins**: Enter name and click "Join Chat"
2. **Real-time Messages**: Type and send messages to all users
3. **Typing Indicator**: Others see when you're typing
4. **User List**: See all connected users
5. **System Notifications**: Know when users join/leave

## 📡 Socket Events

### Client → Server

- `join` - User joins the chat
- `send_message` - Send message to all users
- `typing` - Notify others of typing status
- `get_users` - Request list of online users
- `disconnect` - User leaves (automatic)

### Server → Client

- `user_joined` - Someone joined
- `receive_message` - New message received
- `user_left` - Someone left
- `user_typing` - Someone is typing
- `users_list` - List of online users

## 💻 Example Usage

```javascript
// Server-side event handling
socket.on("send_message", (data) => {
  const message = {
    sender: user.name,
    text: data.text,
    timestamp: new Date()
  };
  io.emit("receive_message", message);
});

// Client-side message sending
socket.emit("send_message", { text: "Hello everyone!" });

// Listen for new messages
socket.on("receive_message", (data) => {
  displayMessage(data);
});
```

## 🎨 UI Features

- **Gradient Background** - Eye-catching purple gradient
- **Message Bubbles** - Own messages on right, others on left
- **Online Indicator** - Green dot for active users
- **Smooth Animations** - Messages slide in smoothly
- **Responsive Layout** - Sidebar + chat area

## 🔧 Configuration

Modify in `server.js`:
- **Port**: Change from 3001
- **CORS Origin**: Restrict to specific domains
- **Message Storage**: Persist messages to database

## 📊 Performance

- Ultra-low latency communication
- Handles hundreds of concurrent users
- Scalable architecture
- Lightweight payloads

## 🚀 Production Features

For production deployment:
- Add message persistence (MongoDB)
- Implement user authentication
- Add room/channel support
- Implement message encryption
- Add rate limiting
- Use Redis for scaling
- Deploy with PM2 or Docker

## 💾 Data Structure

Each message contains:
```json
{
  "id": "timestamp",
  "sender": "User Name",
  "text": "Message content",
  "timestamp": "ISO timestamp",
  "avatar": "Avatar URL"
}
```

User object:
```json
{
  "id": "socket-id",
  "name": "User Name",
  "joinedAt": "ISO timestamp"
}
```

## 🔐 Security Considerations

- Input validation for messages
- Rate limiting against spam
- No sensitive data in messages
- CORS protection
- Socket.io namespace isolation

## 📱 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 👨‍💻 Author

Karan Brahmaxatriya

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Private messaging
- File sharing
- Message reactions
- User profiles
- Chat rooms
- Message search

## 📞 Support

For issues or questions, open a GitHub issue or contact the author.
