const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema ({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    publications: Number,
    author: [Number], 
    category: [String],
});

// create a model
const BookModel = mongoose.model(BookSchema);

//to use in other files
module.exports = BookModel;