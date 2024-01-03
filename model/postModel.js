const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment/moment')

const postSchema = new Schema({
    review:{
        type : String,
        required : true,
    }, 
    created_at:{
        type: Date,
        default : Date.now,
        get: function (createAt) {
            return moment(createAt).format('MMMM Do YYYY')
        }
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    


},{timestamps: true})

module.exports = mongoose.model('Post', postSchema);