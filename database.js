const books = [{
    ISBN: "123Book",
    title: "futher apart",
    pubDate: "2050-01-01",
    language: "eng",
    numPage: 200,
    publications: [1],
    author: [1, 2],  //we are giving the id of the author
    category: ["mystery","sci-fi"],
}];

const author = [{
    id: 1,
    name: "jin",
    books: ["123Book"],
},

{
    id: 2,
    name:"enma",
    books: ["123Book"],
},

];

const publication = [
{
    id: 1,
    name: "we do",
    books: ["123Book"],

},
{
    id: 2,
    name: "all do",
    books: ["123Book","newbook"],

}
];

//export it so that other files can use it

module.exports = {books, author, publication};