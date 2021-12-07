const express = require('express');
const homeRouter = express.Router();
function router(nav){
homeRouter.get('/',function(req,res){
    res.render("home",{
    nav,
    title:'LIBRARY',
  
    });
});
return homeRouter;
}

module.exports = router;