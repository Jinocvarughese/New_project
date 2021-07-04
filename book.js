const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema ({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
    }, //required
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    publications: Number,
    author: [Number], 
    category: [String],
});

// create a model
const BookModel = mongoose.model("books",BookSchema); //created an argument books to identify the database

//to use in other files
module.exports = BookModel;