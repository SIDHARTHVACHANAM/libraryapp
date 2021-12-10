const express = require('express');
const session = require('express-session');
const app = express.Router();
const UserData = require('./model/userdata');


const nav =[
    {link:'/books',name:'BOOKS'},
    {link:'/authors',name:'AUTHORS'}
];
    
const booksRouter = require('./routes/bookRoutes')(nav);
const authorsRouter = require('./routes/authorRoutes')(nav);
const addbookRouter = require('./routes/addbookRoutes')(nav);
const addauthorRouter = require('./routes/addauthorRoutes')(nav);
const signupRouter = require('./routes/signupRoutes')(nav);
const homeRouter = require('./routes/homeRoutes')(nav);
const updateRouter = require('./routes/updateRoutes')(nav);
const updateauthorRouter = require('./routes/updateauthorRoutes')(nav);

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/addbook',addbookRouter);
app.use('/addauthor',addauthorRouter);
app.use('/signup',signupRouter);
app.use('/home',homeRouter);
app.use('/update',updateRouter);
app.use('/updateauthor',updateauthorRouter);

app.use(session({      //session creation
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/',function (req,res){
    req.session.destroy();
    res.render("index",
{
    nav
});
});
var authenticate = function (req, res, next) {  //admin or user
    if (req.session.role == 'admin' || req.session.role == 'user') {
        next();
    } else {
        res.render('/index');
    }
}

app.use(authenticate);

app.get('/', function (req, res) {
    res.render('/index');
});

app.post('/', function (req, res) {

    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    // mongo check for user
    if (username == 'admin' && password == '1234') {
        req.session.role = 'admin';
        console.log("admin login success")
        res.send({ status: true });

    } else {
        UserData.findOne({ Username: username, Password: password }, function (err, user) {
            if (err) {
                res.send({ status: false, data: 'Response error. No Internet' });

            }
            else if (user) {
                console.log("user data", user)
                req.session.role = 'user';
                res.send({ status: true });
            } else {
                res.send({ status: false, data: 'NOT FOUND' });
            }

        });
    }
   
});
  

app.listen(5000);
module.exports= app;
