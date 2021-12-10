const express = require('express');
const app = express.Router();
const Bookdata = require('../model/bookdata');
const multer = require('multer');
const path = require('path');


// function router(nav){
    
app.get('/',function(req,res){
    res.render("addbook",{
        olddata: {}, data: Bookdata, code: '1', update: false, 
    nav
    
    });
});
app.post('/add',function(req,res){
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    let upload = multer({ storage: storage }).single('image');
    upload(req, res, (err) => {
        console.log('add book kack', req.body);

        if (err) {
            console.log('upload err', err);
        } else {
            console.log('body', req.body, req.file)
    var item={
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        image: req.body.image

    }
    if (req.body.updateFlag == 'true') {
        let id = req.body.bookid;
        let updateBook = { $set: item };

        Bookdata.updateOne({ _id: id }, updateBook)
            .then(function (res) {
                console.log('mongo updated successfully')
            }).catch(function (error) {
                console.log('mongo update error', error)
            })
    } else {
        let book = Bookdata(item);
        book.save().then(function (data) {
            console.log('data added', data);
        }).catch(function (error) {
            console.log('error added', error);
        })
    }
}
});

});

  

module.exports = app;