const express = require('express');
const updateRouter = express.Router();
const Bookdata = require('../model/bookdata');

app.get('/update/:id', function (req, res) { //update book
    let id = req.params.id;
    console.log("Hello!" + id);
    Bookdata.findById({ _id: id })
        .then(function (book) {
            res.render('updateRoutes', { olddata: book, data: Bookdata, code: '1', update: true });
        });
});
module.exports=app;