const mongoose = require('mongoose');
const Review=require("./Review");
const User=require("./User");
const Wonder_Schema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    latitude: Number,
    longitude: Number,
    
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

Wonder_Schema.post("findOneAndDelete",async (data)=>{
    if(data.reviews.length){
        await Review.deleteMany({_id:{$in:data.reviews}});
        console.log("ok");
    }
}) 

const Wonder_model=mongoose.model("Wonder_model",Wonder_Schema);
module.exports=Wonder_model;