const express = require('express');
const app = express.Router();
const Authordata = require('../model/authordata');
// function router(nav){
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

app.get('/',function(req,res){
    Authordata.find()
    .then(function(authors){
    res.render("authors",{
        data: Authordata, header: 'AUTHORS', search: 'author', code: '0', role: req.session.role,    
    nav,
    authors
    });
    });
});
app.get('/:id',function(req,res){
    const id =req.params.id;
    Authordata.findOne({_id: id})
    .then(function(author){
    res.render('author',{
        data: Authordata, code: '0', role: req.session.role,
       nav,
        author
    });
    
    });
});
app.post('/deleteauthor', function (req, res) {

    let id = req.body.id;
    Authordata.remove({ _id: id }, (err, result) => {
        if (err) {
            res.send({ status: false, data: err });
        }
        else {

            console.log(req.body)
            res.send({ status: true });
        }
    });
});

module.exports = app;