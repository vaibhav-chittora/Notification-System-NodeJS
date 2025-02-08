const activeUsers = new Set(); // To track connected users

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`⚡ New WebSocket Connection: ${socket.id}`);

    socket.on("registerUser", (userId) => {
      activeUsers.add(userId);
      console.log(`✅ User Registered for Notifications: ${userId}`);
    });

    socket.on("disconnect", () => {
      activeUsers.delete(socket.id);
      console.log(`❌ User Disconnected: ${socket.id}`);
    });
  });
};

// Function to Emit Notification
export const sendPushNotification = (io, userId, message) => {
  io.to(userId).emit("notification", { message });
};

export default setupSocket;
