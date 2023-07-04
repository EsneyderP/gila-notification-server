const Bull = require('bull');
const { config: { redis } } = require('../../config');

// Create a new Bull queue instance
const campaignProcessorQueue = new Bull('campaigns', { redis });
const notificationProcessorQueue = new Bull('notifications', { redis });

const { campaignsWorker, notificationsWorker } = require('./workers');

// Define the worker to process the notifications from the queue
notificationProcessorQueue.process(notificationsWorker);

// Define the worker to process the campaigns from the queue
campaignProcessorQueue.process((job, done) => campaignsWorker(job, done, notificationProcessorQueue));


const queues = [
    {
        name: 'campaigns',
        hostId: 'Campaigns Queue Manager',
        redis,
    },
    {
        name: 'notifications',
        hostId: 'Notifications Queue Manager',
        redis,
    },
];
module.exports = { campaignProcessorQueue, notificationProcessorQueue, queues, Bull };