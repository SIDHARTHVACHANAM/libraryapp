const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    username: String,
    emailaddress: String,
    password:String
});

var Userdata = mongoose.model('userdata',UserSchema);

module.exports = Userdata;