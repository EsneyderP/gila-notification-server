const express = require('express');
const router = express.Router();
const UserSchema = require('../../models/user');
const { normalizeUser } = require('../../helpers/users');

/**
 * @typedef {import('../../types/user').User} User
 */

/**
 * Creates a new user in the Database
 * @param {Object} req - The request object.
 * @param {User} req.body - User data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {User} The new user.
 */
router.post('/', async function(req, res) {
  try {
    const user = new UserSchema(normalizeUser(req.body));
    const newUser = await user.save();
    res.json({ data: newUser });
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
 * @param {User} req.body - User data that will be saved.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Array<User>} An array of users.
 */
router.get('/', async function(req, res) {
  try {
    const users = await UserSchema.find();
    res.json({
      data: users,
    });
  } catch(error) {
    const errorMessage = error.message || 'Internal server error';
    res.status(500).json({
      message: errorMessage,
    })
  }
});

module.exports = router;
