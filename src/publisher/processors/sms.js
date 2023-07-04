/**
 * Send an SMS notification.
 *
 * @param {import('../../types/notification').Notification} notification - The notification to be sent via SMS.
 * @returns {Promise<import('../../types/notification').Notification>} A promise that resolves with the sent notification.
 */
const sms = (notification) => {
    /**
     * The sent notification.
     * @type {import('../../types/notification').Notification}
     */
    const sentNotification = {
      ...notification,
      sentBy: 'SMS', // Indicate that the notification was sent via SMS.
    };
  
    // Simulate sending the SMS by resolving the promise with the sent notification
    return Promise.resolve(sentNotification);
};
  
module.exports = sms;
  