// Prefix : /book

//Initializing express router

const Router = require("express").Router();

//database model

const BookModel = require("../../book");

//bringing our book api

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

Router.get("/", async (request,response) => {
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

Router.get("/is/:isbn",  async (request,response) => {

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

Router.get("/c/:category", async (request, response) =>{
  
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
Router.get("/lan/:language", async(request,response) => {
   
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
Route           book/add
Description     add new book
Access          Public
Parameter       none
Methods         POST
*/

Router.post("/add", async (request,response)=>{
    const {newBook} = request.body;   //const newBook = request.body.newBook  is Destructured to this form

    BookModel.create(newBook);
});




/*
Route           /book/update/title
Description     Update the book
Access          Public
Parameter       isbn
Methods         Put
*/

Router.put("/update/title/:isbn", async (request,response)=>{

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
Route           /book/delete
Description     delete a book
Access          Public
Parameter       isbn
Methods         Delete
*/

Router.delete("/delete/:isbn", async(request,response)=>{
    
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: request.params.isbn,
        });

    return response.json({ books: database.books})
});


/*
Route           /book/delete/author
Description     delete a author from a book
Access          Public
Parameter       isbn,author id
Methods         Delete
*/
Router.delete("/delete/author/:isbn/:authorId",async(request,response)=>
{
     //update the book database
    const updatedBook = await  BookModel.findOneAndUpdate(
    {
        ISBN: request.params.isbn,
    },
    {
       $pull: {
           author: parseInt(request.params.authorId),
       }, 
    },
    {
        new: true,
    }
);


    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(request.params.authorId),
        },
        {
            $pull: {
                books: request.params.isbn,
            },
        },
        {
            new: true,
        }
        );


     return response.json({
         book: updatedBook,
         author: updatedAuthor,
   });
});


/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          Public
Parameter       isbn,pubId
Methods         Delete
*/
Router.delete("/publication/delete/:isbn/:pubId",async (request,response)=>{
    //update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: parseInt(request.params.pubId),
        },
        {
            $pull: {
                books: request.params.isbn,
            },
        },
        {
            new: true,
        }
        );

    //update book database
    const updatedBook = await  BookModel.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
           $pull: {
               author: parseInt(request.params.pubId),
           }, 
        },
        {
            new: true,
        }
    );

     return response.json({
         books: updatedBook , 
         publication: updatedPublication})
});

/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          Public
Parameter       isbn
Methods         Put
*/

Router.put("/publication/update/:isbn",async (request,response) =>{
    //update the publication database

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: request.body.newPublication,
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

  

    //update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: request.params.isbn,
        },
        {
          $addToSet: {
            publications: request.body.newPublication,
          },
        },
        {
            new: true,
        }
    );
    return response.json({
        books: updatedBook,
        publications: updatedPublication,
    });
});



/*
Route           /book/update/author
Description     Update/add new author for a book
Access          Public
Parameter       isbn,authorId
Methods         Put
*/

Router.put("/update/author/:isbn", async (request,response)=> {
   
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


// export the above api
module.exports = Router;