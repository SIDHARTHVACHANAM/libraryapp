const express = require('express');
const authorsRouter = express.Router();
const Authordata = require('../model/Authordata');
function router(nav){
//     var authors =[{
//     name:'S K Pottekkatt',
//     born:'1913, Kozhikode',
//     genre:'Novel, Travelogue, Short story writer',
//     img:'s k p.jpg'
// },
// {
//     name:'K. R. Meera',
//     born:'1970, Sathamcotta',
//     genre:'Novelist, Short story writer',
//     img:'K R MEERA.jpg'
// },
// {
//     name:'Vaikom Muhammad Basheer',
//     born:'1908, Vaikom',
//     genre:'Novel, Short story, Memoirs',
//     img:'basheer.jpg'
// },
// ]

authorsRouter.get('/',function(req,res){
    Authordata.find()
    .then(function(authors){
    res.render("authors",{
    nav,
    title:'LIBRARY',
    authors
    });
    });
});
authorsRouter.get('/:id',function(req,res){
    const id =req.params.id;
    Authordata.findOne({_id: id})
    .then(function(author){
    res.render('author',{
       nav,
       title:'LIBRARY',
        author
    });
    
    });
});
return authorsRouter;
}

module.exports = router;