const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    firstname: String,
    lastname: String,
    emailaddress: String,
    phonenumber: Number,
    password:String
});

var Userdata = mongoose.model('userdata',UserSchema);

module.exports = Userdata;