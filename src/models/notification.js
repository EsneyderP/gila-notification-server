const mongoose = require('mongoose');

/**
 * @typedef {import('../types/notification').Notification} Notification
 */
const notificationSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  message: {
    type: String,
    required: true,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  channelProcessor: {
    // open to new types
    type: String,
    required: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'with-issues', 'failed'],
    required: true,
  },
  retryCount: {
    type: Number,
    required: true,
  },
  errorMessage: {
    type: String,
    required: false,
  }
}, {
    /**
     * This will automatically add the createdAt and updatedAt properties.
     */
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
