const { newNotificationEvent } = require('./notificationManager');
const { createNotification, updateNotification } = require('../helpers/notifications');
const { NotificationStatuses } = require('../types/constants/notifications');

const processors = require('./processors');

jest.mock('../helpers/notifications', () => ({
  createNotification: jest.fn(),
  updateNotification: jest.fn(),
}));

jest.mock('./processors', () => ({
  sms: jest.fn(),
  email: jest.fn(),
  // Add more processor mocks as needed
}));

describe('newNotificationEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a new notification successfully', async () => {
    // Mock data for the new notification
    const mockNotification = {
      _id: 'notificationId',
      channelProcessor: 'sms',
    };

    // Mock the createNotification function to return the new notification
    createNotification.mockResolvedValue(mockNotification);

    // Mock the sms processor function
    processors.sms.mockResolvedValue();

    // Call the newNotificationEvent function
    await newNotificationEvent(mockNotification);

    // Assertions
    expect(createNotification).toHaveBeenCalledTimes(1);
    expect(processors.sms).toHaveBeenCalledTimes(1);
    expect(updateNotification).toHaveBeenCalledTimes(1);
    expect(updateNotification).toHaveBeenCalledWith({
      _id: mockNotification._id,
      status: NotificationStatuses.Sent,
    });
  });

  it('should handle missing processor and update the notification status', async () => {
    // Mock data for the new notification
    const mockNotification = {
      _id: 'notificationId',
      channelProcessor: 'invalidProcessor',
    };

    // Mock the createNotification function to return the new notification
    createNotification.mockResolvedValue(mockNotification);

    // Call the newNotificationEvent function
    await newNotificationEvent(mockNotification);

    // Assertions
    expect(createNotification).toHaveBeenCalledTimes(1);
    expect(processors.invalidProcessor).toBeUndefined();
    expect(updateNotification).toHaveBeenCalledTimes(1);
    expect(updateNotification).toHaveBeenCalledWith({
      _id: mockNotification._id,
      status: NotificationStatuses.WithIssues,
      retryCount: 1,
      errorMessage: `Could not find a processing function of type '${mockNotification.channelProcessor}'`,
    });
  });

  it('should handle errors from the processor and update the notification status', async () => {
    // Mock data for the new notification
    const mockNotification = {
      _id: 'notificationId',
      channelProcessor: 'email',
    };

    // Mock the createNotification function to return the new notification
    createNotification.mockResolvedValue(mockNotification);

    // Mock the email processor function to throw an error
    const errorMessage = 'Failed to send email';
    processors.email.mockRejectedValue(new Error(errorMessage));

    // Call the newNotificationEvent function
    await newNotificationEvent(mockNotification);

    // Assertions
    expect(createNotification).toHaveBeenCalledTimes(1);
    expect(processors.email).toHaveBeenCalledTimes(1);
    expect(updateNotification).toHaveBeenCalledTimes(1);
    expect(updateNotification).toHaveBeenCalledWith({
      _id: mockNotification._id,
      status: NotificationStatuses.WithIssues,
      retryCount: 1,
      errorMessage,
    });
  });
});
