const express = require('express');
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');
function router(nav){
//     var books =[{
//     title:'Aarachaar',
//     author:'K R Meera',
//     genre:'Novel,Fiction',
//     image:'Aarachaar.jpg'
// },
// {
//     title:'Oru Desathinte Katha',
//     author:'S K Pottekkatt',
//     genre:'Novel',
//     image:'oru.jpg'
// },
// {
//     title:'Premalekhanam',
//     author:'Vaikom Muhammad Basheer',
//     genre:'Novel',
//     image:'prem.jpg'
// },
// ]

booksRouter.get('/',function(req,res){
    Bookdata.find()
    .then(function(books){
        res.render("books",{
            nav,
            title:'LIBRARY',
            books 
    });
 });
});
booksRouter.get('/:id',function(req,res){
    const id =req.params.id;
    Bookdata.findOne({_id: id})
    .then(function(book){
        res.render('book',{
            nav,
            title:'LIBRARY',
             book
    });
    
    });
});
return booksRouter;
}

module.exports = router;