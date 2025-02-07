import { sendNotification } from "../services/notification.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, message, type, priority, sendAt } = req.body;
    const notification = await sendNotification({
      userId,
      message,
      type,
      priority,
      sendAt,
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};
