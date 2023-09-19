const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
ninvoice:String,
norder:String,
date:String,
book: String,
user: String,
quantity: Number,
price: Number
});

module.exports = mongoose.model('Invoice', InvoiceSchema);