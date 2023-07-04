const { newCampaignEvent } = require('../../publisher/campaignManager');

/**
 * Process a new campaign job.
 * 
 * @param {Object} job - The Bull job containing the data for the campaign.
 * @param {Function} done - The done function to be called when the job is completed.
 * @param {Object} notificationProcessorQueue - The Bull queue for notification processing.
 * @returns {Promise<void>} A promise that resolves when the job is processed successfully or rejects on error.
 * 
 * @typedef {import('../../types/campaign').Campaign} Campaign
 * @typedef {import('bull').Job} BullJob
 * @typedef {import('bull').DoneCallback} DoneCallback
 * @typedef {import('../../types/notificationProcessorQueue').NotificationProcessorQueue} NotificationProcessorQueue
 */
const processNewCampaignJob = async (job, done, notificationProcessorQueue) => {
    try {
      /**
       * The data for the new campaign.
       * @type {Campaign}
       */
      const campaignData = job.data;
  
      // Process the new campaign using the campaignManager's newCampaignEvent function
      await newCampaignEvent(campaignData, notificationProcessorQueue);
  
      // Update the job progress to 100% as it is completed successfully
      job.progress(100);
  
      // Call the done function with null to indicate success and pass the campaign data
      done(null, job.data);
    } catch (error) {
      // If an error occurs during campaign processing, call the done function with the error
      done(error);
    }
  };
  
  module.exports = processNewCampaignJob;