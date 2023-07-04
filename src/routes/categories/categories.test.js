const request = require('supertest');
const express = require('express');
const router = require('./categories');
const CategorySchema = require('../../models/category');

const app = express();
app.use(express.json()); // Enable parsing of JSON data in the request body
app.use('/', router); // Mount the router on the Express app

// Mock the save method
CategorySchema.prototype.save = jest.fn().mockResolvedValue({ _id: 'mocked-id', name: 'Test Category' });

const newCategoryData = { name: 'Test Category' };

describe('Category Routes', () => {
    it('should create a new category', async () => {
  
      const response = await request(app)
        .post('/')
        .send(newCategoryData);
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe(newCategoryData.name);
    });
  
    it('should return an error if name is missing', async () => {
      const invalidCategoryData = {};
  
      const response = await request(app)
        .post('/')
        .send(invalidCategoryData);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('name is missing in the request.');
    });

    it('GET /categories should return a list of categories', async () => {
        const categories = [
          newCategoryData,
        ];
    
        // Mock the find method of the CategorySchema object
        CategorySchema.find = jest.fn().mockReturnThis(); // Return the same object for method chaining
        CategorySchema.sort = jest.fn().mockResolvedValue(categories);
    
        const response = await request(app).get('/');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: categories });
    });
});
  