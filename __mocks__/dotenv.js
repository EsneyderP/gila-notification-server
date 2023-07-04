// Mock the dotenv config function to set process.env variables
module.exports = {
    config: jest.fn(() => {
      process.env.MONGODB_URI = 'mongoose';
      process.env.API_VERSION_PREFIX = '/api/v1';
    }),
};