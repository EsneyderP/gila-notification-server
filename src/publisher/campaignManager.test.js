const mongoose = require('mongoose');
const { newCampaignEvent } = require('./campaignManager');
const UserSchema = require('../models/user');
const ChannelSchema = require('../models/channel');

jest.mock('../models/user', () => ({
  find: jest.fn(),
}));

jest.mock('../models/channel', () => ({
  find: jest.fn(),
}));

describe('newCampaignEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process notifications for a new campaign', async () => {
    // Mock data for the campaign
    const mockCampaign = {
      _id: 'campaignId',
      categoryId: 'categoryId',
      message: 'New campaign message',
    };

    // Mock data for the channelList
    const mockChannelList = [
      {
        _id: new mongoose.Types.ObjectId(),
        processor: 'sms',
      },
      {
        _id: new mongoose.Types.ObjectId(),
        processor: 'email',
      },
    ];

    // Mock data for the subscribedUsers
    const mockSubscribedUsers = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'User 1',
        subscribedCategories: ['categoryId'],
        notificationChannels: [mockChannelList[0]._id, mockChannelList[1]._id],
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'User 2',
        subscribedCategories: ['categoryId'],
        notificationChannels: [mockChannelList[1]._id],
      },
    ];

    // Mock the find function to return the subscribedUsers
    UserSchema.find = jest.fn().mockReturnThis(); // Return the same object for method chaining
    UserSchema.limit = jest.fn().mockReturnThis(); // Return the same object for method chaining
    UserSchema.skip = jest.fn().mockResolvedValueOnce(mockSubscribedUsers);

    // Mock the find function to return the channelList
    ChannelSchema.find = jest.fn().mockResolvedValueOnce(mockChannelList);

    // Mock the notificationQueue object
    const mockNotificationQueue = {
      add: jest.fn(),
    };

    // Call the newCampaignEvent function
    await newCampaignEvent(mockCampaign, mockNotificationQueue);

    // Assertions
    expect(ChannelSchema.find).toHaveBeenCalledTimes(1);
    expect(UserSchema.find).toHaveBeenCalledTimes(2);
    expect(mockNotificationQueue.add).toHaveBeenCalledTimes(3); // Expecting 3 jobs for 2 users and 3 channels
  });
});
