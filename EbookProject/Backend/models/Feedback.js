const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
name: String,
email: String,
phone:Number,
message: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);