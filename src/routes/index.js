const express = require('express');
const router = express.Router();
const usersRouter = require('./users/users');
const notificationsRouter = require('./notifications/notifications');
const campaignsRouter = require('./campaigns/campaigns');
const channelsRouter = require('./channels/channels');
const categoriesRouter = require('./categories/categories');

/**
 * Creates a super set of API routes
 */
router.use('/users', usersRouter);
router.use('/campaigns', campaignsRouter);
router.use('/channels', channelsRouter);
router.use('/categories', categoriesRouter);
router.use('/notifications', notificationsRouter);

module.exports = router;
