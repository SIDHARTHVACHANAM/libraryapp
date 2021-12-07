const express = require('express');
const addauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
const multer = require('multer');
const path = require('path');

function router(nav){
    
addauthorRouter.get('/',function(req,res){
    res.render("addauthor",{
    nav,
    title:'LIBRARY',
    
    });
});
addauthorRouter.post('/add',function(req,res){
    var item={
        name: req.body.name,
        born: req.body.born,
        genre: req.body.genre,
        image: req.body.image

    }
   var author = Authordata(item);
   author.save();
   res.redirect('/authors');
 
});

return addauthorRouter;
}

module.exports = router;