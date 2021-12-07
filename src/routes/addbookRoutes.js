const express = require('express');
const addbookRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const multer = require('multer');
const path = require('path');

function router(nav){
    
addbookRouter.get('/',function(req,res){
    res.render("addbook",{
    nav,
    title:'LIBRARY',
    
    });
});
addbookRouter.post('/add',function(req,res){
    var item={
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        image: req.body.image

    }
   var book = Bookdata(item);
   book.save();
   res.redirect('/books');
 
});

return addbookRouter;
}


module.exports = router;