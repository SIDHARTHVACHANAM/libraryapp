const express = require('express');
const app = express.Router();
const UserData = require('../model/userdata');
app.post('/signup', function (req, res) {

    console.log(req.body)
    var signup = UserData(req.body);
    signup.save().then(function (data) {
        console.log('data added', data);
        res.send({ status: true });
    }).catch(function (error) {
        console.log('error added', error);
        res.send({ status: false, data: 'Unexpected Error' });
    })
});
module.exports = app;