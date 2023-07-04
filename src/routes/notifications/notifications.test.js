const express = require('express');
const supertest = require('supertest');
const NotificationSchema = require('../../models/notification');
const router = require('./notifications'); // Path to the route file

// Create an instance of the Express app and use the router
const app = express();
app.use('/', router);

jest.mock('../../models/notification', () => ({
  countDocuments: jest.fn(),
  find: jest.fn(),
}));

describe('Notification Route Test', () => {
  it('should return an array of notifications with pagination information', async () => {
    // Mock the countDocuments and find functions to return dummy data
    NotificationSchema.countDocuments.mockResolvedValue(50); // Replace 50 with your desired total count

    NotificationSchema.find = jest.fn().mockReturnThis(); // Return the same object for method chaining
    NotificationSchema.skip = jest.fn().mockReturnThis(); // Return the same object for method chaining
    NotificationSchema.limit = jest.fn().mockReturnThis(); // Return the same object for method chaining
    NotificationSchema.sort = jest.fn().mockResolvedValue([
        { _id: 'id1', title: 'Notification 1' },
        { _id: 'id2', title: 'Notification 2' },
      ]);

    // Make a GET request to the route
    const response = await supertest(app).get('/');

    // Assert the response and its properties
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2); // Change the length based on the number of notifications returned
    expect(response.body.total).toBe(50);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.totalPages).toBe(5); // Change this based on the total notifications and limit

    // Assert the structure of the data in the response
    expect(response.body.data[0]).toHaveProperty('_id');
    expect(response.body.data[0]).toHaveProperty('title');
  });
});
