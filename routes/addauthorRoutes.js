const express = require('express');
const app = express.Router();
const Authordata = require('../model/authordata');
const multer = require('multer');
const path = require('path');

// function router(nav){
    
app.get('/',function(req,res){
    res.render("addauthor",{
    nav,
    olddata: {}, data: Authordata, code: '0', update: false
    
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
        if (err) {
            console.log('upload err', err);
        } else {
            console.log('body', req.body, req.file)
            
    var item={
        name: req.body.name,
        born: req.body.born,
        genre: req.body.genre,
        image: req.body.image

    }
    if (req.body.updateFlag == 'true') {
        let id = req.body.bookid;
        let updateAuthor = { $set: item };

        Authordata.updateOne({ _id: id }, updateAuthor)
            .then(function (res) {
                console.log('mongo updated successfully for author')
            }).catch(function (error) {
                console.log('mongo update error', error)
            })
    } else {
        let author = Authordata(item);
        author.save().then(function (data) {
            console.log('data added', data);
        }).catch(function (error) {
            console.log('error added', error);
        })
    }
}
});


});
  


module.exports = app;