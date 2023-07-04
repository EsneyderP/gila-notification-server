/**
 * Send a push notification.
 *
 * @param {import('../../types/notification').Notification} notification - The notification to be sent as a push notification.
 * @returns {Promise<import('../../types/notification').Notification>} A promise that resolves with the sent notification.
 */
const pushNotification = (notification) => {
    /**
     * The sent notification.
     * @type {import('../../types/notification').Notification}
     */
    const sentNotification = {
      ...notification,
      sentBy: 'PushNotification', // Indicate that the notification was sent as a push notification.
    };
  
    // Simulate sending the push notification by resolving the promise with the sent notification
    return Promise.resolve(sentNotification);
  };
  
  module.exports = pushNotification;
  