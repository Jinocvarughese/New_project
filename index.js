const { request, response } = require("express");
const express = require ("express");

// Importing the DB 
const database = require("./database");

//Initialization
const booky = express();

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

booky.get("/", (request,response) => {
    return response.json({books: database.books});  
});

/*
Route           /is
Description     Get specific book based on ISBN
Access          Public
Parameter       isbn
Methods         GET
*/

booky.get("/is/:isbn", (request,response) => {
    const getSpecificbook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
    );


     if(getSpecificbook.length === 0){
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

booky.get("/c/:category", (request, response) =>{
  const getSpecificbook = database.books.filter(
      (book) => 
      book.category.includes(request.params.category)     //comparing each element
      );

if(getSpecificbook.length === 0){
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
booky.get("/lan/:language", (request,response) => {
    const getSpecificbook = database.books.filter(
        (book) => book.language === request.params.language
    );


     if(getSpecificbook.length === 0){
         return response.json(
             {error: `No book found for the language of ${request.params.lan}`,
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

booky.get("/author", (request,response) =>
{
    return response.json ({ authors: database.author});
});

/*
Route           /author/id
Description     Get the author based on the id
Access          Public
Parameter       id
Methods         GET
*/
booky.get("/author/id/:id", (request,response) => {
    const getSpecificauthor = database.author.filter(
        (author) => author.id === parseInt(request.params.id)
    );


     if(getSpecificauthor.length === 0){
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

booky.get("/author/book/:isbn",(request,response) => {

    const getSpecificauthor = database.author.filter(
        (author) => 
        author.books.includes(request.params.isbn)     //comparing each element
        );
  
  if(getSpecificauthor.length === 0){
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

booky.get("/publication" , (request,response) => {
    return response.json({Publications: database.publication});
});

/*
Route           /publication/id
Description     Get specific publications by id
Access          Public
Parameter       id
Methods         GET
*/

booky.get("/publication/id/:id", (request,response) => {
    const getSpecificpubl = database.publication.filter(
        (anyname) => anyname.id === parseInt(request.params.id)
    );


     if(getSpecificpubl.length === 0){
         return response.json(
             {error: `No publivation of id ${request.params.id} is found`,
            });
     }
     return response.json({author: getSpecificpubl});

    });

/*
Route           /publication/book
Description     Get specific publications based on book
Access          Public
Parameter       isbn
Methods         GET
*/

booky.get("/publication/book/:isbn", (request, response) =>{
    const getSpecificpubl = database.publication.filter(
        (book) => 
        book.books.includes(request.params.isbn)     //comparing each element bcoz its an array
        );
  
  if(getSpecificpubl.length === 0){
      return response.json(
          {error: `No book found for the isbn value of ${request.params.isbn}`,
         });
  }
  return response.json({book: getSpecificpubl});
  });


booky.listen(5000, () => console.log("I'm running"));                                                     