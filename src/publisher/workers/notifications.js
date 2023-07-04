const { newNotificationEvent } = require('../../publisher/notificationManager');

/**
 * Process a new notification job.
 *
 * @param {Object} job - The Bull job containing the data for the notification.
 * @param {Function} done - The done function to be called when the job is completed.
 * @returns {Promise<void>} A promise that resolves when the job is processed successfully or rejects on error.
 *
 * @typedef {import('../../types/notification').Notification} Notification
 * @typedef {import('bull').Job} BullJob
 * @typedef {import('bull').DoneCallback} DoneCallback
 */
const processNewNotificationJob = async (job, done) => {
    try {
      /**
       * The data for the new notification.
       * @type {Notification}
       */
      const notificationData = job.data;
  
      // Process the new notification using the notificationManager's newNotificationEvent function
      await newNotificationEvent(notificationData);
  
      // Update the job progress to 100% as it is completed successfully
      job.progress(100);
  
      // Call the done function with null to indicate success and pass the notification data
      done(null, job.data);
    } catch (error) {
      // If an error occurs during notification processing, call the done function with the error
      done(error);
    }
};
  
module.exports = processNewNotificationJob;
  