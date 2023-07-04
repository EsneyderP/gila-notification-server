/* eslint-disable no-undef */
/**
 * @typedef {Object} Campaign
 * @property {string} message - The content of the Campaign message.
 * @property {string} categoryId - The id of the category associated with the Campaign.
 * @property {Date} updatedAt - The date of the Campaign's last update.
 * @property {Date} createdAt - The date of the Campaign's creation.
 * @property {'sent' | 'pending' | 'with-issues' | 'failed'} status - The status of the Campaign.
 * @property {number} retryCount - The number of times the Campaign has been retried.
 * @property {number} errorMessage - Error description if something fails
 */

module.exports = Campaign;
