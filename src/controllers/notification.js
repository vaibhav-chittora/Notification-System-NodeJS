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
    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.log("error in createNotification controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: "Failed to create notification",
    });
  }
};
