const NotificationSchema = require('../models/notification');

const {
  createNotification,
  updateNotification,
} = require('./notifications');

// // Mock the Mongoose model and its functions
// jest.mock('../models/notification', () => ({
//   findOneAndUpdate: jest.fn(),
//   save: jest.fn(),
// }));

describe('Notification Functions', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  it('createNotification should save a new notification', async () => {
    // Mock the data passed to createNotification
    const data = {
      categoryId: 'cat-1',
      message: 'This is a new notification.',
    };

    // Mock the return value of the save function
    const mockNotification = {
      _id: 'notificationId',
      categoryId: 'cat-1',
      message: 'This is a new notification.',
      status: 'pending',
      retryCount: 0,
    };

    const saveMock = jest.spyOn(NotificationSchema.prototype, 'save');
    saveMock.mockResolvedValue(mockNotification);

    // Call the createNotification function
    const result = await createNotification(data);

    // Assertions
    expect(result).toEqual(mockNotification);
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it('updateNotification should find and update a notification', async () => {
    const data = {
      _id: 'notificationId',
      title: 'Updated Notification',
      message: 'This is an updated notification.',
    };

    // Mock the return value of the findOneAndUpdate function
    const mockUpdatedNotification = {
      _id: 'notificationId',
      title: 'Updated Notification',
      message: 'This is an updated notification.',
      status: 'pending',
      retryCount: 1,
    };

    const findOneMock = jest.spyOn(NotificationSchema, 'findOneAndUpdate');
    findOneMock.mockResolvedValue(mockUpdatedNotification); 

    // Call the updateNotification function
    const result = await updateNotification(data);

    // Assertions
    expect(result).toEqual(mockUpdatedNotification);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith(
      { _id: data._id },
      data,
      { new: true }
    );
  });
});
