import notificationQueue from "../config/queue.js";
import { createNotification } from "../repositories/notification.js";
import Notification from "../schema/notification.js";

export const sendNotification = async (data) => {
  const { userId, message, type } = data;

  // Check if a similar notification was sent in the last hour
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  const existingNotification = await Notification.findOne({
    userId,
    message,
    createdAt: { $gte: oneHourAgo },
  });

  if (existingNotification) {
    console.log("⚠️ Duplicate notification suppressed:", message);
    return { message: "Duplicate notification suppressed" };
  }

  // Create Notification & Queue
  const notification = await createNotification(data);
  await notificationQueue.add("sendNotification", {
    notificationId: notification._id,
  });

  return notification;
};
