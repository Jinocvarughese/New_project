require("dotenv").config();

const express = require ("express");
const mongoose = require("mongoose");

// Importing the DB 
const database = require("./database");

//Models
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication");

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

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

booky.get("/", async (request,response) => {
    const getAllBooks = await BookModel.find();
    return response.json({books: getAllBooks});  
});

/*
Route           /is
Description     Get specific book based on ISBN
Access          Public
Parameter       isbn
Methods         GET
*/

booky.get("/is/:isbn",  async (request,response) => {

const getSpecificbook = await BookModel.findOne({ISBN: request.params.isbn});

     if(!getSpecificbook){   //converting false to true & true to false
         return response.json(
             {error: `No book found for the ISBN of ${request.params.isbn}`,
            });
     }
     return response.json({book: getSpecificbook});

    });
/*
Route           /c
Description     Get specific book based on category
Access          Public
Parameter       category
Methods         GET
*/

booky.get("/c/:category", async (request, response) =>{
  
  const getSpecificbook = await BookModel.findOne({
      category: request.params.category,
})
  
if(!getSpecificbook){
    return response.json(
        {error: `No book found for the category of ${request.params.category}`,
       });
}
return response.json({book: getSpecificbook});
});

/*
Route           /lan
Description     Get specific book based on language
Access          Public
Parameter       language
Methods         GET
*/
booky.get("/lan/:language", async(request,response) => {
   
    const getSpecificbook = await BookModel.findOne({
        language: request.params.language,
  })

     if(!getSpecificbook){
         return response.json(
             {error: `No book found for the language of ${request.params.language}`,
            });
     }
     return response.json({book: getSpecificbook});

    });

   /*
Route           /author
Description     Get all authors
Access          Public
Parameter       none
Methods         GET
*/

booky.get("/author", async (request,response) =>
{
    const getAllAuthors = await AuthorModel.find();
    return response.json ({ authors: getAllAuthors});
});

/*
Route           /author/id
Description     Get the author based on the id
Access          Public
Parameter       id
Methods         GET
*/
booky.get("/author/id/:id", async(request,response) => {
    const getSpecificauthor = await AuthorModel.findOne({
        id: request.params.id,
  })

     if(!getSpecificauthor){
         return response.json(
             {error: `No author of id ${request.params.id} is found`,
            });
     }
     return response.json({author: getSpecificauthor});

    });


    /*
Route           /author/book
Description     Get all authors based on book
Access          Public
Parameter       isbn
Methods         GET
*/

booky.get("/author/book/:isbn",async (request,response) => {

    const getSpecificauthor = await AuthorModel.find({
        books: request.params.isbn,
  })
  
  if(!getSpecificauthor){
      return response.json(
          {error: `No author found for the book of isbn value ${request.params.isbn}`,
         });
  }
  return response.json({author: getSpecificauthor});
  });

/*
Route           /publication
Description     Get all publications
Access          Public
Parameter       none
Methods         GET
*/

booky.get("/publication" , async(request,response) => 
    {    
        const getAllPublishers = await PublicationModel.find();
        return response.json ({ Publications: getAllPublishers});
    });


/*
Route           /publication/id
Description     Get specific publications by id
Access          Public
Parameter       id
Methods         GET
*/

booky.get("/publication/id/:id", async (request,response) => {
    const getSpecificpubl = await PublicationModel.find({
        id: request.params.id,
  })

     if(!getSpecificpubl){
         return response.json(
             {error: `No publivation of id ${request.params.id} is found`,
            });
     }
     return response.json({Publications: getSpecificpubl});

    });

/*
Route           /publication/book
Description     Get specific publications based on book
Access          Public
Parameter       isbn
Methods         GET
*/

booky.get("/publication/book/:isbn", async(request, response) =>{
    const getSpecificpubl = await PublicationModel.find({
        books: request.params.isbn,
  })
  
  if(!getSpecificpubl){
      return response.json(
          {error: `No Publication found for the book ${request.params.isbn}`,
         });
  }
  return response.json({Publication: getSpecificpubl});
  });

/*
Route           book/add
Description     add new book
Access          Public
Parameter       none
Methods         POST
*/

booky.post("/book/add", async (request,response)=>{
     const {newBook} = request.body;   //const newBook = request.body.newBook  is Destructured to this form

     BookModel.create(newBook);
});

/*
Route           /author/add
Description     add new author
Access          Public
Parameter       none
Methods         POST
*/

booky.post("/author/add", async(request,response)=>
{     
const {newAuthor} = request.body;   

AuthorModel.create(newAuthor);

});

/*
Route           publication/add
Description     add new publication
Access          Public
Parameter       none
Methods         POST
*/

booky.post("/publication/add", async(request,response)=>
{     
const {newPublication} = request.body;   

PublicationModel.create(newPublication);

});

/*
Route           /book/update/title
Description     Update the book
Access          Public
Parameter       isbn
Methods         Put
*/

booky.put("/book/update/title/:isbn", async (request,response)=>{

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: request.params.isbn,
    },

    {
        title: request.body.newBookTitle
    },
    {
        new: true,  //to see the updated booktitle in postman output
    }
);
         return response.json({books: updatedBook})
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          Public
Parameter       isbn,authorId
Methods         Put
*/

booky.put("/book/update/author/:isbn", async (request,response)=> {
   
    //update book database
  const updatedBook = await BookModel.findOneAndUpdate(
      {
          ISBN: request.params.isbn,
      },
      {
        $addToSet: {
            author: request.body.newAuthor,
        },
      },
      {
          new: true,
      }
  );

  //update author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
          id: request.body.newAuthor,
      },
      {
          $addToSet:  {
              books: request.params.isbn,
          },
      },
      {
          new: true,
      }
  );

    return response.json({books: updatedBook, author: updatedAuthor});
});

/*
Route           /book/update/author
Description     Update the AUTHOR NAME
Access          Public
Parameter       authorId
Methods         Put
*/

booky.put("/book/update/author/:authorId", (request,response)=>{
    database.author.forEach((author) => {

        if (author.id === parseInt(request.params.authorId)){
            author.name = request.body.newAuthorname;
            return;
        }

    }); 
    return response.json({Authors : database.author})
});

/*
Route           /book/update/publication
Description     Update the publication Name
Access          Public
Parameter       pubId
Methods         Put
*/

booky.put("/book/update/publication/:pubId", (request,response)=>{
    database.publication.forEach((publication) => {

        if (publication.id === parseInt(request.params.pubId)){
            publication.name = request.body.newPublicationname;
            return;
        }

    }); 
    return response.json({Publications: database.publication})
});
  

/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          Public
Parameter       isbn
Methods         Put
*/

booky.put("/publication/update/book/:isbn", (request,response) =>{
    //update the publication database
    database.publication.forEach((publication)=>{
      if(publication.id === request.body.pubId) {
         return publication.books.push(request.params.isbn); //return is imp
      }
    });

    //update the book database
    database.books.forEach((book)=> {
        if(book.ISBN === request.params.isbn){
            book.publication = request.body.pubId;
            return;
        }
    });
    return response.json({
        books: database.books,
        publications: database.publication,
        message: "successfully updated publication",
    });
});

/*
Route           /book/delete
Description     delete a book
Access          Public
Parameter       isbn
Methods         Delete
*/

booky.delete("/book/delete/:isbn", (request,response)=>{

    const updatedBookDatabase = database.books.filter((book)=> 
    book.ISBN !== request.params.isbn // the books that are not deleted are stored in updatedBookDatabase
    );

    database.books =  updatedBookDatabase;  //change the database from const to let bcoz we cannot modify it if it is a const
    return response.json({ books: database.books})
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          Public
Parameter       isbn,author id
Methods         Delete
*/
booky.delete("/book/delete/author/:isbn/:authorId",(request,response)=>
{
     //update the book database
     database.books.forEach((book)=>{
        if(book.ISBN === request.params.isbn){
             const newAuthorList = book.author.filter(
                 (author)=> author !== parseInt(request.params.authorId)
               );
             book.author = newAuthorList;
            return;
        }
     });

     //update the author database
     database.author.forEach((author)=> {
         if(author.id === parseInt(request.params.authorId)){
             const newBookList = author.books.filter((book)=> 
             book!== request.params.isbn
             );

             author.books = newBookList;
             return;
         }
     });
     return response.json({
         book: database.books,
         author: database.author,
   });
});

/*
Route           author/delete
Description     delete an author 
Access          Public
Parameter       author id
Methods         Delete
*/

booky.delete("/author/delete/:authorId", (request,response)=>{
    const updatedAuthorDatabase = database.author.filter((authors)=> 
    authors.id !== parseInt(request.params.authorId) 
    );

    database.author = updatedAuthorDatabase;  
    return response.json({ Authors: database.author})
});

/*
Route           /publication/delete
Description     delete a publication 
Access          Public
Parameter       pubId
Methods         Delete
*/
booky.delete("/publication/delete/:pubId", (request,response)=>{
    const updatedPublication = database.publication.filter((publications)=> 
    publications.id !== parseInt(request.params.pubId) 
    );

    database.publication = updatedPublication;  
    return response.json({ Publications: database.publication})
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          Public
Parameter       isbn,pubId
Methods         Delete
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (request,response)=>{
    //update publication database
    database.publication.forEach((publications)=>{
        if(publications.id === parseInt(request.params.pubId)){
            const newBookList = publications.books.filter((book)=>
            book !== request.params.isbn
            );

            publications.books = newBookList;
            return;
        }
    });

    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === request.params.isbn){
            book.publications = 0; // no publication available
            return;
        }
    });
     return response.json({
         books: database.books, 
         publication: database.publication})
});

booky.listen(5000, () => console.log("I'm running")); 