const mongoose = require('mongoose');

/**
 * @typedef {import('../../types/user').User} User
 *
 * Normalize user data by converting arrays of category and channel IDs to mongoose ObjectIds.
 * @param {User} data - The user data object to normalize.
 * @returns {NormalizedUserData} The normalized user data object.
 */
const normalizeUser = (data) => {
    const channels = data.notificationChannels || [];
    const categories = data.subscribedCategories || [];
    return {
        ...data,
        // Convert each category ID to ObjectId
        notificationChannels: channels.map((channelId) => new mongoose.Types.ObjectId(channelId)) || [],
        subscribedCategories: categories.map((categoryId) => new mongoose.Types.ObjectId(categoryId)) || [],
    };
}
module.exports = {
    normalizeUser,
};
