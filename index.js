const { request, response } = require("express");
const express = require ("express");

// Importing the DB 
const database = require("./database");

//Initialization
const booky = express();

//configuration--error happens in postman if not defined
booky.use(express.json());

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

booky.post("/book/add", (request,response)=>{
     const {newBook} = request.body;   //const newBook = request.body.newBook  is Destructured to this form

     database.books.push(newBook);  //pushing  NEW BOOK TO THE DATABASE

     return response.json({books: database.books})
});

/*
Route           /author/add
Description     add new author
Access          Public
Parameter       none
Methods         POST
*/

booky.post("/author/add", (request,response)=>
{     
const {newAuthor} = request.body;   

database.author.push(newAuthor);  

return response.json({authors: database.author})

});

/*
Route           publication/add
Description     add new publication
Access          Public
Parameter       none
Methods         POST
*/

booky.post("/publication/add", (request,response)=>
{     
const {newPublication} = request.body;   

database.publication.push(newPublication);  

return response.json({Publications: database.publication})

});

/*
Route           /book/update/title
Description     Update the book
Access          Public
Parameter       isbn
Methods         Put
*/

booky.put("/book/update/title/:isbn", (request,response)=>{
         database.books.forEach((book) => {

             if (book.ISBN === request.params.isbn){
                 book.title = request.body.newBookTitle;
                 return;
             }

         }); 
         return response.json({books: database.books})
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          Public
Parameter       isbn,authorId
Methods         Put
*/

booky.put("/book/update/author/:isbn/:authorId", (request,response)=> {
    //update book database
database.books.forEach((book) => 
{
    if(book.ISBN===request.params.isbn){
       return book.author.push(parseInt(request.params.authorId));
    }
});
    //update author database
    database.author.forEach((author)=>
    {
      if(author.id === parseInt(request.params.authorId))
         return author.books.push(request.params.isbn);
    });

    return response.json({books: database.books, author:database.author});
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
booky.listen(5000, () => console.log("I'm running"));                                                     