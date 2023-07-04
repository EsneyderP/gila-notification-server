const NotificationSchema = require('../models/notification');
const { NotificationStatuses } = require('../types/constants/notifications');

/**
 * @typedef {import('../types/notification').Notification} Notification
 *
 * Create a new notification with the provided data, setting default values for status and retryCount.
 *
 * @param {Notification} data - The data to create the notification with.
 * @returns {Promise<Notification>} A promise that resolves with the created notification.
 */
const createNotification = (data) => {
    const backfilledNotification = {
        ...data,
        status: NotificationStatuses.Pending,
        retryCount: 0,
    };
  
    const notification = new NotificationSchema(backfilledNotification);
    return notification.save();
};

/**
 * Update an existing notification with the provided data.
 *
 * @param {Notification} data - The data to update the notification with.
 * @returns {Promise<Notification>} A promise that resolves with the updated notification.
 */
const updateNotification = async (data) => {   
    // Assuming 'data._id' contains the ObjectId of the document to update
    const filter = { _id: data._id };
    const options = { new: true }; // Return the updated document

    const updatedNotification = await NotificationSchema.findOneAndUpdate(filter, data, options);

    return updatedNotification;
};

module.exports = {
    createNotification,
    updateNotification,
};
