const mongoose = require('mongoose');

/**
 * @typedef {import('../types/user').User} User
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    /**
     * List of all the categories' ids where the user is subscribed
     */
    subscribedCategories: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Array of ObjectIds
        required: true,
    },
    /**
     * List of the notification's channel ids for (SMS | E-Mail | Push Notification)
     */
    notificationChannels: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }], // Array of ObjectIds
        required: true,
    },
}, {
    /**
     * This will automatically add the createdAt and updatedAt properties.
     */
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);