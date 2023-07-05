const request = require('supertest');
const express = require('express');
const router = require('./channels');
const ChannelSchema = require('../../models/channel');

const app = express();
app.use(express.json()); // Enable parsing of JSON data in the request body
app.use('/', router); // Mount the router on the Express app

// Mock the save method
ChannelSchema.prototype.save = jest.fn().mockResolvedValue({ _id: 'mocked-id', name: 'Test Channel', processor: 'Test processor' });

const newChannelData = { name: 'Test Channel', processor: 'Test processor' };

describe('Channel Routes', () => {
    it('should create a new channel', async () => {
  
      const response = await request(app)
        .post('/')
        .send(newChannelData);
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe(newChannelData.name);
      expect(response.body.data.processor).toBe(newChannelData.processor);
    });
  
    it('should return an error if processor or name is missing', async () => {
      const invalidChannelData = { processor: 'Test processor' };
  
      const response = await request(app)
        .post('/')
        .send(invalidChannelData);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('processor, or name is missing in the request.');
    });

    it('GET /channels should return a list of channels', async () => {
        const channels = [
          newChannelData,
        ];
    
        // Mock the find method of the ChannelSchema object
        ChannelSchema.find = jest.fn().mockReturnThis(); // Return the same object for method chaining
        ChannelSchema.sort = jest.fn().mockResolvedValue(channels);
    
        const response = await request(app).get('/');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: channels });
    });
  });
  