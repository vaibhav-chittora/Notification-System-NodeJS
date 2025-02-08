import express from "express";
import connectDB from "./config/db.js";
import { PORT } from "./config/serverConfig.js";
import http from "http";
import setupSocket from "./sockets/socket.js";
import notificationRoutes from "./routes/notification.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Emit push notification when a new notification is sent
const sendPushNotification = (message) => {
  io.emit("newNotification", { message });
};

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});

export { sendPushNotification };
