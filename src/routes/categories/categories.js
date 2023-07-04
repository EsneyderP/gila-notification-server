const express = require('express');
const router = express.Router();

const CategorySchema = require('../../models/category');

/**
 * @typedef {import('../../types/category').Category} Category
 */

/**
 * Creates a new category in the Database
 * @param {Object} req - The request object.
 * @param {Category} req.body - Category data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Category} The new Category.
 */
router.post('/', async function(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name is missing in the request.' });
    }
    
    const category = new CategorySchema(req.body);
    const newCategory = await category.save();
    res.json({ data: newCategory });
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
 * @returns {Array<Category>} An array of users.
 */
router.get('/', async function(req, res) {
  try {
    const categories = await CategorySchema.find().sort({ name: 1});
    res.json({
      data: categories,
    });
  } catch(error) {
    res.json({
      message: error,
      status: 500,
    })
  }
});

module.exports = router;
