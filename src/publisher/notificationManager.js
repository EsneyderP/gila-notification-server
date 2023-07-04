const { NotificationStatuses } = require('../types/constants/notifications');
const { createNotification, updateNotification } = require('../helpers/notifications');
const processors = require('./processors');

const newNotificationEvent = async (notification) => {
  const newNotification = await createNotification(notification);
  try {
    const processingFunction = processors[newNotification.channelProcessor];

    if(!processingFunction || typeof processingFunction !== 'function') {
        const errorMessage = `Could not find a processing function of type '${newNotification.channelProcessor}'`;
        // Missing processor
        return updateNotification({
            _id: newNotification._id,
            status: NotificationStatuses.WithIssues,
            retryCount: 1,
            errorMessage,
        });
    }

    await processingFunction(newNotification);
    return updateNotification({
        _id: newNotification._id,
        status: NotificationStatuses.Sent,
    });
  } catch (error) {
      const errorMessage = error.message || 'Internal server error';

      // Unknown error
      return updateNotification({
          _id: newNotification._id,
          status: NotificationStatuses.WithIssues,
          retryCount: 1,
          errorMessage,
      });
  }
};

module.exports = { newNotificationEvent };