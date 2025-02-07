import { createNotification } from "../repositories/notification.js";
import notificationQueue from "../config/queue.js";

export const sendNotification = async (data) => {
  const notification = await createNotification(data);

  // Add Job to Bull Queue
  await notificationQueue.add("sendNotification", {
    notificationId: notification._id,
  });

  return notification;
};
