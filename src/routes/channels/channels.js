const express = require('express');
const router = express.Router();

const ChannelSchema = require('../../models/channel');

/**
 * @typedef {import('../../types/channel').Channel} Channel
 */

/**
 * Creates a new Channel in the Database
 * @param {Object} req - The request object.
 * @param {Channel} req.body - Channel data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Channel} The new Channel.
 */
router.post('/', async function(req, res) {
  try {
    const { processor, name } = req.body;
    if (!name || !processor) {
      return res.status(400).json({ error: 'processor, or name is missing in the request.' });
    }
    
    const channel = new ChannelSchema(req.body);
    const newChannel = await channel.save();
    res.json({ data: newChannel });
  } catch(error) {
    const errorMessage = error.message || 'Internal server error';
    res.status(500).json({
      message: errorMessage,
    })
  }
});

/**
 * Returns a list of users
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Array<Channel>} An array of users.
 */
router.get('/', async function(req, res) {
  try {
    const channels = await ChannelSchema.find().sort({ name: 1});
    res.json({
      data: channels,
    });
  } catch(error) {
    const errorMessage = error.message || 'Internal server error';
    res.status(500).json({
      message: errorMessage,
    })
  }
});

module.exports = router;
