import Queue from "bull";
import Notification from "../schema/notification.js";
import sendEmail from "../utils/email.js";
import { sendPushNotification } from "../index.js"; // **Import WebSocket function**

// Redis Queue Setup
const notificationQueue = new Queue("notifications", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// **Job Processor - Send Notifications**
notificationQueue.process(async (job) => {
  console.log(`🚀 Processing Job: ${job.id}`, job.data);

  const { notificationId } = job.data;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    console.log("❌ Notification not found in DB.");
    return;
  }

  // **Send Email Notification**
  if (notification.type === "email") {
    await sendEmail(notification.message);
  }

  // **Emit WebSocket Push Notification**
  console.log("📢 Sending WebSocket Notification");
  sendPushNotification(notification.message);

  // **Update Status in MongoDB**
  await Notification.findByIdAndUpdate(notificationId, { status: "sent" });

  console.log(`✅ Notification Sent: ${notificationId}`);
});

// **Check Pending Notifications Every Minute**
setInterval(async () => {
  const pendingNotifications = await Notification.find({
    status: "pending",
    sendAt: { $lte: new Date() },
  });

  pendingNotifications.forEach((notification) => {
    notificationQueue.add("sendNotification", {
      notificationId: notification._id,
    });
  });

  console.log(
    `📅 Scheduled Notifications Queued: ${pendingNotifications.length}`
  );
}, 60000); // **Runs every 60 seconds**

export default notificationQueue;
