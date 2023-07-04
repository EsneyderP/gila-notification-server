const campaigns = require('./campaigns');
const notifications = require('./notifications');

module.exports = {
    campaignsWorker: campaigns,
    notificationsWorker: notifications,
};
