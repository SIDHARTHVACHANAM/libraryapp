const express = require('express');
const updateRouter = express.Router();
const bookdata = require('../model/Bookdata');
const multer = require('multer');
const path = require('path');
app.get('/update_book/:id', function (req, res) { //update book
    let id = req.params.id;
    console.log("Hello!" + id);
    bookdata.findById({ _id: id })
        .then(function (book) {
            res.render('update', { olddata: book, data: add_book, code: '1', update: true });
        });
});