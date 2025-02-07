import Notification from "../schema/notification.js";

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const getPendingNotifications = async () => {
  return await Notification.find({
    status: "pending",
    sendAt: { $lte: new Date() },
  });
};

export const updateNotificationStatus = async (id, status) => {
  return await Notification.findByIdAndUpdate(id, { status }, { new: true });
};
