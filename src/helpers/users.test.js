const mongoose = require('mongoose');
const { normalizeUser } = require('./users');

describe('normalizeUser', () => {
  it('should normalize user data with category IDs and channel IDs as ObjectIds', () => {
    // Sample input data
    const data = {
      _id: 'user-id-123',
      name: 'John Doe',
      notificationChannels: ['64a3eb45d221f2011a3f47be', '64a3eb45d221f2011a3f47ba'],
      subscribedCategories: ['64a3eb45d221f2011a3f47bb', '64a3eb45d221f2011a3f47bc'],
    };

    // Expected output with ObjectIds
    const expectedOutput = {
      _id: 'user-id-123',
      name: 'John Doe',
      notificationChannels: [
        new mongoose.Types.ObjectId('64a3eb45d221f2011a3f47be'),
        new mongoose.Types.ObjectId('64a3eb45d221f2011a3f47ba'),
      ],
      subscribedCategories: [
        new mongoose.Types.ObjectId('64a3eb45d221f2011a3f47bb'),
        new mongoose.Types.ObjectId('64a3eb45d221f2011a3f47bc'),
      ],
    };

    // Call the normalizeUser function with the input data
    const result = normalizeUser(data);

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array for notificationChannels and subscribedCategories if not provided', () => {
    // Sample input data with missing notificationChannels and subscribedCategories
    const data = {
      _id: 'user-id-123',
      name: 'John Doe',
      // notificationChannels and subscribedCategories are not provided
    };

    // Expected output with empty arrays for notificationChannels and subscribedCategories
    const expectedOutput = {
      _id: 'user-id-123',
      name: 'John Doe',
      notificationChannels: [],
      subscribedCategories: [],
    };

    // Call the normalizeUser function with the input data
    const result = normalizeUser(data);

    expect(result).toEqual(expectedOutput);
  });
});
