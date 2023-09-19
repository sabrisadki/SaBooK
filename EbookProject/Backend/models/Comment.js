const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
name: String,
email: String,
bookid:String,
commentext: String,
});

module.exports = mongoose.model('Comment', CommentSchema);