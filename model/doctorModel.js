const mongoose = require('mongoose')
const moment = require('moment/moment')

const doctorSchema = new mongoose.Schema({

      name:{
        type : String,
        required : true,
        minLength: 3
      },
      specialization: {
        type: String,
        required: true,
      },
      experience: {
        type: Number,
        required: true,
      },
      email:{
        type : String,
        required : true
      },
        mobile: {
        type: Number,
        default: "",
      }, 
      
    },
    
   {timestamps: true})

module.exports = mongoose.model('Doctor', doctorSchema);