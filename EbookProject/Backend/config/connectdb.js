const mongoose = require('mongoose')

const connectdb=async()=>{
    try{
    await mongoose.connect('mongodb://localhost/bookstore', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
    console.log('database successfully connected')
    }catch(err){
        console.log(err)
    }
    }
module.exports = connectdb