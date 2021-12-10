const express = require('express');
const app = express.Router();
// function router(nav){
app.get('/',function(req,res){
    res.render("home",{
    nav,
    role: req.session.role 
   });  
});
// return homeRouter;
// }

module.exports = app;