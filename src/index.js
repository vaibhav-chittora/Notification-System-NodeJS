import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import setupSocket from "./sockets/socket.js";
import notificationRoutes from "./routes/notification.js";
import { PORT } from "./config/serverConfig.js";

const app = express();
const server = http.createServer(app);
const io = setupSocket(server); // **Initialize WebSocket**

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// **Emit WebSocket Events**
export const sendPushNotification = (message) => {
  console.log("📢 Emitting WebSocket event: newNotification");
  io.emit("newNotification", { message });
};

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
