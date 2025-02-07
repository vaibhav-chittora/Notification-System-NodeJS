import Queue from "bull";
import { updateNotificationStatus } from "../repositories/notification.js";
import sendEmail from "../utils/email.js";

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

export default notificationQueue;
