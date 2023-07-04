const request = require('supertest');
const express = require('express');
const router = require('./users');

const UserSchema = require('../../models/user');

const app = express();
app.use(express.json()); // Enable parsing of JSON data in the request body
app.use('/', router); // Mount the router on the Express app

const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    subscribedCategories: ['64a3eb45d221f2011a3f47be', '64a3eb45d221f2011a3f47ba'],
    notificationChannels: ['64a3eb45d221f2011a3f47bd', '64a3eb45d221f2011a3f47bc'],
};

describe('Users Routes', () => {
    it('GET /users should return a list of users', async () => {
        // Mock the find method of the UserSchema object
        const findMock = jest.spyOn(UserSchema, 'find');
        findMock.mockResolvedValue([{ ...newUser, _id: 1}]); // Mock the find function to return users
    
        const response = await request(app).get('/');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: [{ ...newUser, _id: 1 }]});
    });

    it('POST /users should create a new user', async () => {
        // Mock the save method of the UserSchema object
        const saveMock = jest.spyOn(UserSchema.prototype, 'save');
        saveMock.mockResolvedValue({ ...newUser, _id: 1}); // Mock the save function to return newUser

        const response = await request(app).post('/').send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: { ...newUser, _id: 1 }});
    });
});
