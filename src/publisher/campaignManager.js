const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const ChannelSchema = require('../models/channel');

const getChannelProcessor = (channelId, channelList) => channelList.find((channel) => channel._id.equals(new mongoose.Types.ObjectId(channelId))).processor;

// Function to process notifications for a batch of subscribed users
const processBatchNotifications = async ({
    categoryId, campaignId, channelList, message, skipCount, batchSize, notificationQueue
}) => {
  try {
    // Retrieve a batch of subscribed users using pagination (limit: batchSize, skip: skipCount)
    const subscribedUsers = await UserSchema.find({ subscribedCategories: { $in: [categoryId] } })
      .limit(batchSize)
      .skip(skipCount);
  
    if (subscribedUsers.length === 0) {
      return; // Exit the function if there are no more subscribed users
    }

    // Add jobs to the Bull queue for each user's notification
    const jobs = subscribedUsers.flatMap((user) => {
        // Create a separate job for each channel in the notificationChannels array
        return user.notificationChannels.map((channelId) => {
            return notificationQueue.add({
                user: {
                    id: user._id,
                    name: user.name,
                },
                campaignId,
                categoryId,
                message,
                channelId,
                channelProcessor: getChannelProcessor(channelId, channelList),
            });
        });
    });

    // Wait for each batch of jobs to complete before processing the next batch
    await Promise.all(jobs);
    
    // Recursively call the function with the next batch of users
    await processBatchNotifications({
      campaignId,
      categoryId,
      channelList,
      message,
      skipCount: skipCount + batchSize,
      batchSize,
      notificationQueue,
    });
  } catch (error) {
    return error;
  }
};
  
const newCampaignEvent = async (campaign, notificationProcessorQueue) => {
  // Set batch size and initial skip count
  const batchSize = 1000;
  const skipCount = 0;
  const { categoryId, message, _id } = campaign;
  
  const channelList = await ChannelSchema.find();
  if (!channelList || !channelList.length) {
    throw Error('Not Channels available');
  }

  // Start processing notifications for subscribed users using recursive function
  await processBatchNotifications({ 
    campaignId: _id,
    categoryId,
    message,
    channelList,
    skipCount,
    batchSize,
    notificationQueue: notificationProcessorQueue,
  });
};

module.exports = { newCampaignEvent };