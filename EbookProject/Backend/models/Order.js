const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
norder: String,
bookid: String,
userid: String,
quantity: Number,
status:String,

});

module.exports = mongoose.model('Order', OrderSchema);
