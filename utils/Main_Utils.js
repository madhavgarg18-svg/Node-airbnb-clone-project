 const Wrapfunction=(fun)=>{
    return function(req,res,next){
        fun(req,res,next).catch((err)=>{
            next(err);
        })
    }
}

// module.exports=Wrapfunction;


const Review=require("../Model/Review");
const ReviewAuthorization=async(req,res,next)=>{
 let{id,ReviewID}=req.params;
  let result=await Review.findById(ReviewID);
  if(!result.author.equals(req.user._id)){
    req.flash("error","this review isn not created by you");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// module.exports=ReviewAuthorization;



const redirecturl = (req, res, next) => {
  if (req.session.redirecturl) {
    res.locals.redirecturl = req.session.redirecturl;
  }
  next();
};

// module.exports = redirecturl;





const isauthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Store GET version of the route if available
    if (req.method === "GET") {
      req.session.redirecturl = req.originalUrl;
    } else {
      // Fallback: send to listing show page instead of POST route
      let referer = req.get('referer');
      if (referer) {
        // Only path, not full URL
        const url = new URL(referer);
        req.session.redirecturl = url.pathname;
      } else {
        req.session.redirecturl = "/listings"; // fallback
      }
    }

    req.flash("error", "You are not login please login first");
    return res.redirect("/login");
  }
  next();
}

// module.exports=isauthentication;



class ExpressError extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
}

// module.exports=ExpressError;


const Wonder_model=require("../Model/schema");
const isAuthorization=async (req,res,next)=>{
let{id}=req.params;
let list=await Wonder_model.findById(id);
  if (!list.owner.equals(res.locals.usersinfo._id)){
    req.flash("error","you are not a owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// module.exports=isAuthorization;

module.exports = {
  Wrapfunction,
  ReviewAuthorization,
  redirecturl,
  isauthentication,
  ExpressError,
  isAuthorization,
};