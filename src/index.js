import express from "express";
import connectDB from "./config/db.js";
import { PORT } from "./config/serverConfig.js";
import notificationRoutes from "./routes/notification.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
