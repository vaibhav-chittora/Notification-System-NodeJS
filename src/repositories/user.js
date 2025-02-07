import UserPreference from "../schema/user.js";

export const getUserPreferences = async (userId) => {
  return await UserPreference.findOne({ userId });
};
