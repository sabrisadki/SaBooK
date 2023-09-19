const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    avatarUrl:String,
    name: String,
    email: String, 
    phone: Number ,
    password:  String,
    role:{
        type:String, 
        default:'user'
    },
});
module.exports = mongoose.model('User', userSchema);
