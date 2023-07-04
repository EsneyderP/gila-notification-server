/**
 * @typedef {Object} NotificationStatuses
 * @property {string} Sent - 'sent'
 * @property {string} WithIssues - 'with-issues'
 * @property {string} Pending - 'pending'
 * @property {string} Failed - 'failed'
 */

const NotificationStatuses = {
    Sent: 'sent',
    WithIssues: 'with-issues',
    Failed: 'failed',
    Pending: 'pending',
};
  
module.exports = { NotificationStatuses };