import Notification from "../schema/notification.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalSent = await Notification.countDocuments({ status: "sent" });
    const totalFailed = await Notification.countDocuments({ status: "failed" });

    const avgDeliveryTime = await Notification.aggregate([
      { $match: { status: "sent" } },
      {
        $group: {
          _id: null,
          avgTime: { $avg: { $subtract: ["$updatedAt", "$createdAt"] } },
        },
      },
    ]);

    res.json({
      totalSent,
      totalFailed,
      avgDeliveryTime: avgDeliveryTime.length ? avgDeliveryTime[0].avgTime : 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
