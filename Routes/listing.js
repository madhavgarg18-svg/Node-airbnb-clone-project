const express = require('express');
const router=express.Router();
const{ExpressError,Wrapfunction,ReviewAuthorization,isAuthorization,isauthentication}=require("../utils/Main_Utils");
const Controller_code=require("../controller/listing");
const listingSchema=require("../utils/FormServerSchema");
const reviewServerSchema=require("../utils/ReviewServerSchema");
const multer  = require('multer')
const storage=require("../cloudconfig");
const upload = multer(storage);


router.get("/search", Wrapfunction(Controller_code.search));

//Add new list form Route
router.get("/NewListform",isauthentication,Controller_code.AddNewListform)


//index home route
router.get("",Wrapfunction(Controller_code.index));

// show information route
router.get("/:id",Wrapfunction(Controller_code.ShowInformation))

//Add new list into databse route

router.post("/NewList",isauthentication,upload.single('listing[image]'),Wrapfunction(Controller_code.AddNewList))


//Edit listing form route
router.get("/:id/Edit",isauthentication,isAuthorization,Wrapfunction(Controller_code.Editlist))

//Update listing
router.patch("/:id",isauthentication,isAuthorization,upload.single('listing[image]'),Wrapfunction(Controller_code.updatelist))

//delete listing route

router.delete("/:id",isauthentication,isAuthorization,Wrapfunction(Controller_code.DeleteList))

//submit review
router.post("/:id/review",isauthentication,Wrapfunction(Controller_code.AddReview))



//Delete review and uodate listing
router.delete("/:id/Reviews/:ReviewID",isauthentication,ReviewAuthorization,Wrapfunction(Controller_code.DeleteRoute))


module.exports=router;