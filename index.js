require("dotenv").config();

const express = require ("express");
const mongoose = require("mongoose");

// MODELS & DATABASE ARE REMOVED

//Microservices routes
const Books = require ("./API/Book"); // server will automatically look for index without having to name it
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//Initialization
const booky = express();

//configuration--error happens in postman if not defined
booky.use(express.json());

//establish database connection

mongoose
.connect( process.env.MONGO_URL, 
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 }
)
.then(()=> console.log("Connection Established!"));

//Initializing microservices

booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);

booky.listen(5000, () => console.log("Server running")); 