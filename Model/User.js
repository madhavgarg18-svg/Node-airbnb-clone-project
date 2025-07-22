const mongoose = require('mongoose');
const localmongoose=require("passport-local-mongoose");

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(localmongoose);
const User=mongoose.model("User",userSchema);
module.exports=User;