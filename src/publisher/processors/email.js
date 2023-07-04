/**
 * Send an email notification.
 *
 * @param {import('../../types/notification').Notification} notification - The notification to be sent via email.
 * @returns {Promise<import('../../types/notification').Notification>} A promise that resolves with the sent notification.
 */
const email = (notification) => {
    /**
     * The sent notification.
     * @type {import('../../types/notification').Notification}
     */
    const sentNotification = {
      ...notification,
      sentBy: 'Email', // Indicate that the notification was sent via email.
    };
  
    // Simulate sending the email by resolving the promise with the sent notification
    return Promise.resolve(sentNotification);
  };
  
  module.exports = email;