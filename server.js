if(process.env.NODE_ENV !="Production"){
  require('dotenv').config()
}

const localDb_url='mongodb://127.0.0.1:27017/MERN';
const db_url=process.env.DBATLAS_URL;
console.log(db_url);
const mongoose = require('mongoose');

main().then(()=>{
 console.log("Database connected");
})
.catch(err => console.log(err));


async function main() {
  try {
    await mongoose.connect(localDb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Optional: exit the app if DB fails
  }
}

const express = require('express');
const ejsMate = require('ejs-mate');

const {ExpressError, Wrapfunction}=require("./utils/Main_Utils");


const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("./Model/User");
const flash = require('connect-flash');
const path=require("path");
const app = express();
const Router_Listing=require("./Routes/listing");
const Router_Login=require("./Routes/login");
const Router_signup=require("./Routes/signup");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.set("view engine","ejs");
app.engine('ejs', ejsMate);
app.use(express.json()); // JSON data ke liye
app.use(express.urlencoded({ extended: true })); // Form data ke liye
const methodOverride = require('method-override');
const Wonder_model = require('./Model/schema');
app.use(methodOverride('_method'));

let port=8080;
app.listen(port,()=>{
    console.log("server start");
})


app.use(session({
  secret: process.env.SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    httpOnly: true,                  
  }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

//connect flash middleware

app.use((req, res, next) => {
  res.locals.SuccessMsg = req.flash("Success"); 
  res.locals.ErrorMsg = req.flash("error");  
  res.locals.usersinfo=req.user;   
  next();
});


//singup form
app.use("/Signup",Router_signup);


//login route
app.use("/login",Router_Login);

//logout
app.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(new ExpressError(500,err));
    }
    req.flash("success","You are succesfully logout");
    res.redirect("/listings");
  })
})





//Listing routes
app.use("/listings",Router_Listing);



// Handle 404 errors for unmatched routes
app.use("/", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next)=>{
  if(err.name=="CastError"){
   err= new ExpressError(400,"Invalid ID format: Please check the URL.");
  }
  next(err);
})


// Error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.render("Error.ejs",{status,message});
});