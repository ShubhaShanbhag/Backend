const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

     firstname:{
        type : String,
        required : true,
        minLength:3
    },
     lastname:{
        type : String,
        required : true
     },
     email:{
        type : String,
        required : true
     },
     password:{
      type: String,
      required :true 
     }
    
     }, {timestamps: true})

        const User = mongoose.model('User', userSchema)
        module.exports = User;