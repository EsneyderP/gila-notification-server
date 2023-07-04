const mongoose = require('mongoose');

/**
 * @typedef {import('../types/channel').Channel} Channel
 */
const channelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    processor: {
        // open to new procesor types
        type: String,
        required: true,
    },
}, {
    /**
     * This will automatically add the createdAt and updatedAt properties.
     */
    timestamps: true,
});

module.exports = mongoose.model('Channel', channelSchema);