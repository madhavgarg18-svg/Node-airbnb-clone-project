const express = require('express');
const router=express.Router();

const {Wrapfunction}=require("../utils/Main_Utils");
const signupSchema=require("../utils/SignupserverSchema");
const User=require("../Model/User");

router.get("/",Wrapfunction(async(req,res,next)=>{
  res.render("Signup.ejs");
}));

router.post("",Wrapfunction(async(req,res,next)=>{
  let{error}=signupSchema.validate(req.body);
  if(error){
    req.flash("error",error.details[0].message);
    return res.redirect("/SignUp");
  }
  let{username,email,password}=req.body;
   const existingUser = await User.findOne({ username: username });
   if(existingUser){
    req.flash("error","A user with the given username is already registered");
    return res.redirect("/SignUp");
   }
  let userobj=new User({username:username,email:email});
  await User.register(userobj,password);
  req.login(userobj,(err)=>{
    if(err){
      return next(new ExpressError(500,err));
    }
    req.flash("success","Welcome to Wonderlust");
    res.redirect("/listings");
  })
}))

module.exports=router;
