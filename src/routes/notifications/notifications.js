const express = require('express');
const router = express.Router();
const NotificationSchema = require('../../models/notification');

/**
 * @typedef {import('../../types/notification').Notification} Notification
 */

/**
 * Returns a list of notifications
 * @param {Object} req - The request object.
 * @param {Notification} req.body - Notification data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Array<Notification>} An array of notifications.
 */
router.get('/', async function(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    // Calculate the number of items to skip based on the limit and page number
    const skipItems = (page - 1) * limit;

    // Get the total count of all existing notifications in the database
    const total = await NotificationSchema.countDocuments();

    // Get the array of notifications for the specified page and limit
    const notifications = await NotificationSchema.find()
      .skip(skipItems)
      .limit(limit)
      .sort({ updatedAt: -1});

    // Return the desired structure with pagination information
    res.json({
      data: notifications,
      total: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });

  } catch(error) {
    const errorMessage = error.message || 'Internal server error';
    res.status(500).json({
      message: errorMessage,
    })
  }
});

module.exports = router;
