const express = require('express');
const router=express.Router();

const passport = require("passport");
const {redirecturl}=require("../utils/Main_Utils");

router.get("",(req,res)=>{
  res.render("login.ejs");
})

router.post("",redirecturl,passport.authenticate("local",{
  failureRedirect: "/login",
  failureFlash: true,
}),(req,res)=>{
  let result=res.locals.redirecturl || "/listings";
  req.flash("Success","Welcome Back");
  res.redirect(result);
})

module.exports=router;