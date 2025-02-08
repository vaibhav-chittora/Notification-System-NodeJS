import Queue from "bull";
import {
  updateNotificationStatus,
  getPendingNotifications,
} from "../repositories/notification.js";
import sendEmail from "../utils/email.js";
import Notification from "../schema/notification.js";

// Redis Connection
const notificationQueue = new Queue("notifications", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Job Processor
notificationQueue.process(async (job) => {
  console.log(`🚀 Processing Job: ${job.id}`, job.data);

  const { notificationId } = job.data;
  const notification = await updateNotificationStatus(notificationId, "sent");

  if (notification.type === "email") {
    await sendEmail(notification.message);
  }

  console.log(`✅ Notification Sent: ${notificationId}`);
});

// **Scheduled Job: Check Pending Notifications Every Minute**

setInterval(async () => {
  const now = new Date();
  const nextHour = new Date();
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);

  // Fetch all low-priority notifications scheduled within the next hour
  const lowPriorityNotifications = await Notification.find({
    priority: "low",
    sendAt: { $gte: now, $lt: nextHour },
  });

  if (lowPriorityNotifications.length > 1) {
    const summaryMessage = lowPriorityNotifications
      .map((n) => n.message)
      .join("\n");

    // Send as a single batch notification
    await sendEmail(summaryMessage);
    await Notification.updateMany(
      { _id: { $in: lowPriorityNotifications.map((n) => n._id) } },
      { status: "sent" }
    );

    console.log("📩 Batched Low-Priority Notifications Sent");
  }
}, 60000);

export default notificationQueue;
