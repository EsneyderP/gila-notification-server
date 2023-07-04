/**
 * @typedef {Object} CampaignStatuses
 * @property {string} Sent - 'sent'
 * @property {string} WithIssues - 'with-issues'
 * @property {string} Pending - 'pending'
 * @property {string} Failed - 'failed'
 */

const CampaignStatuses = {
    Sent: 'sent',
    WithIssues: 'with-issues',
    Failed: 'failed',
    Pending: 'pending',
};
  
module.exports = { CampaignStatuses };