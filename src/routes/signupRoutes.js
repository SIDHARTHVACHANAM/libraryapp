const express = require('express');
const signupRouter = express.Router();
const SignUpData = require('../model/Userdata');
app.post('/signup', function (req, res) {

    console.log(req.body)
    var signup = SignUpData(req.body);
    signup.save().then(function (data) {
        console.log('data added', data);
        res.send({ status: true });
    }).catch(function (error) {
        console.log('error added', error);
        res.send({ status: false, data: 'Unexpected Error' });
    })
});

signupRouter.get('/',function(req,res){
    res.render("signup",{
    title:'LIBRARY'
    });
});
return signupRouter;


module.exports = app;