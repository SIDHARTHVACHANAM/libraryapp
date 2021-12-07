const express = require('express');
const session = require('express-session');
const app = express.Router();
const SignUpData = require('../model/Userdata');


const nav =[
    {link:'/books',name:'BOOKS'},
    {link:'/authors',name:'AUTHORS'}
];
    
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const addbookRouter = require('./src/routes/addbookRoutes')(nav);
const addauthorRouter = require('./src/routes/addauthorRoutes')(nav);
const signupRouter = require('./src/routes/signupRoutes')(nav);
const homeRouter = require('./src/routes/homeRoutes')(nav);

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/addbook',addbookRouter);
app.use('/addauthor',addauthorRouter);
app.use('/signup',signupRouter);
app.use('/home',homeRouter);
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
    nav,
    title:'LIBRARY'
});
});
var authenticate = function (req, res, next) {  //admin or user
    if (req.session.role == 'admin' || req.session.role == 'user') {
        next();
    } else {
        res.render('/home');
    }
}

app.use(authenticate);

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
        SignUpData.findOne({ Username: username, Password: password }, function (err, user) {
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
module.exports=app;