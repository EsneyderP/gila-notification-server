const mongoose = require('mongoose');

/**
 * @typedef {import('../types/category').Category} Category
 */
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    /**
     * This will automatically add the createdAt and updatedAt properties.
     */
    timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);