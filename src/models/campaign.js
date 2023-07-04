const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
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

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
