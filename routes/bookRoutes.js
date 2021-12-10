const express = require('express');
const app = express.Router();
const Bookdata = require('../model/bookdata');
// function router(nav){
    var books =[{
    title:'Aarachaar',
    author:'K R Meera',
    genre:'Novel,Fiction',
    image:'Aarachaar.jpg'
},
{
    title:'Oru Desathinte Katha',
    author:'S K Pottekkatt',
    genre:'Novel',
    image:'oru.jpg'
},
{
    title:'Premalekhanam',
    author:'Vaikom Muhammad Basheer',
    genre:'Novel',
    image:'prem.jpg'
},
]

app.get('/',function(req,res){
    Bookdata.find()
    .then(function(books){
        res.render("books",{
             data: book, header: 'BOOKS', search: 'book', code: '1', role: req.session.role,
            nav,
            books 
    });
 });
});
app.get('/:id',function(req,res){
    const id =req.params.id;
    Bookdata.findOne({_id: id})
    .then(function(book){
        res.render('book',{
            data: book, code: '1', role: req.session.role, 
            nav,
             book
    });
    
    });
});
app.post('/deletebook', function (req, res) {

    let id = req.body.id;
    Bookdata.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            res.send({ status: false, data: err });
        } else {


            console.log(req.body)
            res.send({ status: true });
        }
    });
});




module.exports = app;