const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const routerFeedback = express.Router();

routerFeedback.get('/fbs', feedbackController.getAllFeedbacks);
routerFeedback.post('/addfb', feedbackController.addFeedback);
routerFeedback.put('/upfb', feedbackController.upfb);
routerFeedback.delete('/delfb/:id', feedbackController.delfb);

module.exports = routerFeedback;
