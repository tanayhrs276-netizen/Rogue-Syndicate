import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

const users = new Map();
function joinIfNeeded() {
  const name = document.querySelector("#nameInput").value;
  const room = document.querySelector("#roomInput").value;
  socket.emit("join", { name, room });
}


io.on("connection", (socket) => {
  socket.on("join", ({ name = "Anonymous", room = "general" }) => {
    room = String(room).slice(0, 20).trim() || "general";
    name = String(name).slice(0, 20).trim() || "Anonymous";

    socket.join(room);
    users.set(socket.id, { name, room });

    socket.emit("system", { text: `Welcome ${name}! You joined #${room}` });
    socket.to(room).emit("system", { text: `${name} joined #${room}` });

    emitRoomUsers(room);
  });

  socket.on("chat:message", (text) => {
    const user = users.get(socket.id);
    if (!user) return;

    const payload = {
      from: user.name,
      text: String(text).slice(0, 2000),
      ts: Date.now(),
    };
    io.to(user.room).emit("chat:message", payload);
  });

  socket.on("chat:typing", (isTyping) => {
    const user = users.get(socket.id);
    if (!user) return;

    socket.to(user.room).emit("chat:typing", {
      from: user.name,
      isTyping: Boolean(isTyping),
    });
  });

  socket.on("switch:room", (room) => {
    const user = users.get(socket.id);
    if (!user) return;

    const oldRoom = user.room;
    const newRoom = String(room).slice(0, 20).trim() || "general";
    if (oldRoom === newRoom) return;

    socket.leave(oldRoom);
    socket.join(newRoom);
    users.set(socket.id, { ...user, room: newRoom });

    socket.emit("system", { text: `You switched to #${newRoom}` });
    socket.to(oldRoom).emit("system", { text: `${user.name} left #${oldRoom}` });
    socket.to(newRoom).emit("system", { text: `${user.name} joined #${newRoom}` });

    emitRoomUsers(oldRoom);
    emitRoomUsers(newRoom);
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (!user) return;

    const { name, room } = user;
    users.delete(socket.id);
    socket.to(room).emit("system", { text: `${name} left #${room}` });
    emitRoomUsers(room);
    console.log("👋 client disconnected:", socket.id);
  });

  function emitRoomUsers(room) {
    const list = Array.from(users.values())
      .filter((u) => u.room === room)
      .map((u) => u.name);

    io.to(room).emit("room:users", { room, users: list });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
