const express = require('express');
const updateauthorRouter = express.Router();
const authordata = require('../model/authordata');
const app = require('./addauthorRoutes');

app.get('/updateauthor/:id', function (req, res) { //update book
    let id = req.params.id;
    console.log("Hello!" + id);
    authordata.findById({ _id: id })
        .then(function (author) {
            res.render('updateauthorRoutes', { olddata: author, data: authordata, code: '1', update: true });
        });
});
module.export=app;