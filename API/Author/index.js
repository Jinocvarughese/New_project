const Router = require("express").Router();

const AuthorModel = require("../../author");

/*
Route           /author
Description     Get all authors
Access          Public
Parameter       none
Methods         GET
*/
Router.get("/", async (request,response) =>
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
Router.get("/id/:id", async(request,response) => {
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

Router.get("/book/:isbn",async (request,response) => {

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
Route           /author/add
Description     add new author
Access          Public
Parameter       none
Methods         POST
*/

Router.post("/add", async(request,response)=>
{
  try{    
   const {newAuthor} = request.body;   

   await AuthorModel.create(newAuthor);

} catch(error){
    return response.json({ error : error.message});
}
});


/*
Route           /book/update/authorname
Description     Update the AUTHOR NAME
Access          Public
Parameter       authorId
Methods         Put
*/

Router.put("/update/authorname/:authorId", async (request,response)=>{
   
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
          id: request.params.authorId,
        },
    
        {
            name: request.body.newAuthorTitle
        },
        {
            new: true,  
        }
    );

    return response.json({Authors : updatedAuthor})
});


/*
Route           author/delete
Description     delete an author 
Access          Public
Parameter       author id
Methods         Delete
*/

Router.delete("/delete/:authorId", async (request,response)=>{
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id: request.params.authorId,
        });
  
    return response.json({ Authors: updatedAuthorDatabase})
});

module.exports = Router;