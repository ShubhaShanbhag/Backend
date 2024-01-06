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
     age: {
        type: Number,
        default: "",
      },
      gender: {
        type: String,
        default: "neither",
      },
      mobile: {
        type: Number,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        default: "pending",
      },
    
     }, {timestamps: true})
const User = mongoose.model('User', userSchema)
module.exports = User;