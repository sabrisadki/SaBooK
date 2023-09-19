const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    publisher: String,
    publishedDate: Date,
    description: String,
    pageCount: Number,
    printtype: String,
    categories: [String],
    maturityRating: String,
    contentVersion: String,
    imageLinks: String,
    language: String,
    pdfUrl:String,  
});

module.exports = mongoose.model('Book', bookSchema);
