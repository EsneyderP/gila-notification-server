/* eslint-disable no-undef */
/**
 * @typedef {Object} Notification
 * @property {{ id: string, name: string }} user - The user associated with the notification.
 * @property {string} message - The content of the notification message.
 * @property {string} channelId - The id of the notification channel.
 * @property {string} categoryId - The id of the category associated with the notification.
 * @property {string} campaignId - The id of the campaign associated with the notification.
 * @property {Date} updatedAt - The date of the notification's last update.
 * @property {Date} createdAt - The date of the notification's creation.
 * @property {'sms' | 'email' | 'pushNotification' } channelProcessor - The processor name of channel
 * @property {'sent' | 'pending' | 'with-issues' | 'failed'} status - The status of the notification.
 * @property {number} retryCount - The number of times the notification has been retried.
 * @property {number} errorMessage - Error description if something fails
 */

module.exports = Notification;
