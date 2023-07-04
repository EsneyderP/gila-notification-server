const request = require('supertest');
const express = require('express');
const router = require('./campaigns');
const CampaignSchema = require('../../models/campaign');
const { CampaignStatuses } = require('../../types/constants/campaign');
const { campaignProcessorQueue } = require('../../publisher/queues');

const app = express();
app.use(express.json());
app.use('/', router);

// Mock the dependencies
jest.mock('../../models/campaign');
jest.mock('../../publisher/queues');

describe('POST /', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create a new campaign and return it', async () => {
    const mockCampaignData = {
      categoryId: 'category-id',
      message: 'Test campaign',
    };

    const mockSavedCampaign = {
      _id: 'campaign-id',
      ...mockCampaignData,
      status: CampaignStatuses.Pending,
      retryCount: 0,
    };

    const saveMock = jest.fn().mockResolvedValueOnce(mockSavedCampaign);

    // Mock the campaign save method to throw an error
    CampaignSchema.mockReturnValueOnce({
      save: saveMock,
    });

    // Mock the campaignProcessorQueue add method
    campaignProcessorQueue.add.mockResolvedValueOnce();

    const response = await request(app).post('/').send(mockCampaignData);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockSavedCampaign);
    expect(CampaignSchema).toHaveBeenCalledWith({
        ...mockCampaignData,
        status: CampaignStatuses.Pending,
        retryCount: 0,
    });
    expect(saveMock).toHaveBeenCalled();
    expect(campaignProcessorQueue.add).toHaveBeenCalledWith(mockSavedCampaign);
  });

  test('should return 400 if categoryId or message is missing', async () => {
    const mockInvalidCampaignData = {
      categoryId: 'category-id',
    };

    const response = await request(app).post('/').send(mockInvalidCampaignData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('categoryId, or message is missing in the request.');
    expect(CampaignSchema).not.toHaveBeenCalled();
    expect(campaignProcessorQueue.add).not.toHaveBeenCalled();
  });

  test('should handle errors and return 500 status', async () => {
    const mockCampaignData = {
      categoryId: 'category-id',
      message: 'Test campaign',
    };

    const mockError = new Error('Database error');
    const saveMock = jest.fn().mockRejectedValueOnce(mockError);

    // Mock the campaign save method to throw an error
    CampaignSchema.mockReturnValueOnce({
      save: saveMock,
    });
    const response = await request(app).post('/').send(mockCampaignData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(mockError.message);
    expect(CampaignSchema).toHaveBeenCalledWith({
        ...mockCampaignData,
        status: CampaignStatuses.Pending,
        retryCount: 0,
    });
    expect(saveMock).toHaveBeenCalled();
    expect(campaignProcessorQueue.add).not.toHaveBeenCalled();
  });
});
