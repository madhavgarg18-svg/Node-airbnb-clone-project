const Wonder_model=require("../Model/schema");
const listingSchema=require("../utils/FormServerSchema");
const reviewServerSchema=require("../utils/ReviewServerSchema");
const Review=require("../Model/Review");
const ExpressError=require("../utils/ExpressError");
const getCoordinates=require("../utils/getCoordinates");

module.exports.search=async (req, res, next) => {
  let { location } = req.query;
  console.log("Searched Location:", location);

  if (!location || location.trim() === "") {
    req.flash("error", "Please enter location");
    return res.redirect("/listings");
  }

  let list = await Wonder_model.find({
    location: { $regex: new RegExp(`^${location.trim()}$`, 'i') }
  });

  if (!list || list.length === 0) {
    req.flash("error", "List is not found");
    return res.redirect("/listings");
  }

  res.render("Country.ejs", { list });
}



module.exports.index=async (req,res)=>{
 const data= await Wonder_model.find({});
 res.render("Home.ejs",{data});
}


module.exports.AddNewListform=(req,res)=>{
  res.render("NewListform.ejs");
}

module.exports.AddNewList=async (req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
 let result=listingSchema.validate(req.body)
 if(result.error){
   return next(new ExpressError(400,result.error.details[0].message)) ;
 }
  let listing=req.body.listing;
  const fullLocation = `${listing.location}, ${listing.country}`;
  const coords = await getCoordinates(fullLocation);
  const data=new Wonder_model(listing);
  data.image.url=url;
  data.image.filename=filename;
  data.owner=req.user._id;
  console.log(coords);
  if(!coords){
   req.flash("error","invalid location and country coordinates not found");
   return res.redirect("/listings/NewListform");
  }
  data.latitude = coords.latitude;
  data.longitude = coords.longitude;
  await data.save();
  console.log(data);
  req.flash("Success","List successfully Added");
  res.redirect("/listings");
}

module.exports.ShowInformation=async(req,res)=>{
  let{id}=req.params;
  const data=await Wonder_model.findOne({_id:id}).populate({
    path: "reviews",
    populate: {
      path: "author", 
      select: "username" 
    }
  }).populate("owner");
   if(!data){
    req.flash("error","List is not exsist");
   return res.redirect("/listings");
  }
  res.render("Show.ejs",{data});
}


module.exports.Editlist=async (req,res)=>{
  let{id}=req.params;
  const data=await Wonder_model.findById(id);
  if(!data){
    req.flash("error","List is not exsist");
   return res.redirect("/listings");
  }
   res.render("Editform.ejs",{data});
}

module.exports.updatelist=async (req,res,next )=>{
 
  let{id}=req.params;
   let result=listingSchema.validate(req.body)
 if(result.error){
   return next(new ExpressError(400,result.error.details[0].message)) ;
 }
  let listing=req.body.listing;
  let list=await Wonder_model.findByIdAndUpdate({_id:id},listing, { new: true,runValidators: true });
  if(typeof req.file != "undefined"){
     let url=req.file.path;
     let filename=req.file.filename;
    list.image.url=url;
    list.image.filename=filename;
    await list.save();
  }
   req.flash("Success","List successfully Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.DeleteList=async(req,res)=>{
  let{id}=req.params;
  const data=await Wonder_model.findByIdAndDelete(id);
   req.flash("Success","List successfully deleted");
  res.redirect("/listings");
}

module.exports.AddReview=async(req,res,next)=>{
  let{id}=req.params;
  let{error}=reviewServerSchema.validate(req.body);
  if(error){
    return next(new ExpressError(400,error.details[0].message));
  }
  let review=req.body.review;
  let reviewobj=new Review(review);
  reviewobj.author=req.user._id;
  await reviewobj.save();
  let list= await Wonder_model.findOne({_id:id});
  list.reviews.push(reviewobj);
  await list.save();
   req.flash("Success","Review successfully Added")
  res.redirect(`/listings/${id}`);
}

module.exports.DeleteRoute=async(req,res,next)=>{
  let{id,ReviewID}=req.params;
  await Review.findByIdAndDelete({_id:ReviewID});
  await Wonder_model.findByIdAndUpdate({_id:id},{$pull:{reviews:ReviewID}},{new:true,runValidators:true});
   req.flash("Success","Review successfully Deleted")
  res.redirect(`/listings/${id}`);
}