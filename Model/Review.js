const { date } = require('joi');
const mongoose = require('mongoose');
const User = require('./User');
const reviewSchema=mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
})

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;