const Router = require("express").Router();

const PublicationModel = require("../../publication");


/*
Route           /publication
Description     Get all publications
Access          Public
Parameter       none
Methods         GET
*/

Router.get("/" , async(request,response) => 
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

Router.get("/id/:id", async (request,response) => {
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

Router.get("/book/:isbn", async(request, response) =>{
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
Route           publication/add
Description     add new publication
Access          Public
Parameter       none
Methods         POST
*/

Router.post("/add", async(request,response)=>
{     
const {newPublication} = request.body;   

PublicationModel.create(newPublication);

});



/*
Route           /book/update/publication
Description     Update the publication Name
Access          Public
Parameter       pubId
Methods         Put
*/

Router.put("/book/update/:pubId", async(request,response)=>{
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: request.params.pubId,
          },
      
          {
              name: request.body.newPubTitle
          },
          {
              new: true,  
          }
      );
    

return response.json({Publications: updatedPublication})
});


/*
Route           /publication/delete
Description     delete a publication 
Access          Public
Parameter       pubId
Methods         Delete
*/
Router.delete("/delete/:pubId", async (request,response)=>{
const updatedPublication =  await PublicationModel.findOneAndDelete(
    {
        id: request.params.pubId,
    });
return response.json({ Publications: updatedPublication})
});

module.exports = Router;
