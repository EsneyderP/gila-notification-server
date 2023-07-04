const express = require('express');
const router = express.Router();

const CampaignSchema = require('../../models/campaign');
const { CampaignStatuses } = require('../../types/constants/campaign');
const { campaignProcessorQueue } = require('../../publisher/queues');
/**
 * @typedef {import('../../types/campaign').Campaign} Campaign
 */

/**
 * Creates a new campaign in the Database
 * @param {Object} req - The request object.
 * @param {Campaign} req.body - Campaign data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Campaign} The new Campaign.
 */
router.post('/', async function(req, res) {
  try {
    const { categoryId, message } = req.body;
    if (!categoryId || !message) {
      return res.status(400).json({ error: 'categoryId, or message is missing in the request.' });
    }

    const backfilledCampaign = {
      ...req.body,
      status: CampaignStatuses.Pending,
      retryCount: 0,
    };

    const notification = new CampaignSchema(backfilledCampaign);
    const newCampaign = await notification.save();
    
    // Added new campaign to the queue to be processed
    await campaignProcessorQueue.add(newCampaign);

    res.json({ data: newCampaign });
  } catch(error) {
    const errorMessage = error.message || 'Internal server error';
    res.status(500).json({
      message: errorMessage,
    })
  }
});

module.exports = router;
