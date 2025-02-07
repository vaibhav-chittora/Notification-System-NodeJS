import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    preferredChannels: [{ type: String, enum: ["email", "sms", "push"] }],
    quietHours: {
      start: { type: String }, // Example: "22:00" (10 PM)
      end: { type: String }, // Example: "08:00" (8 AM)
    },
    maxNotificationsPerHour: { type: Number, default: 3 },
  },
  { timestamps: true }
);

const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);

export default UserPreference;
