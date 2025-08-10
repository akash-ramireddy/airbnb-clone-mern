const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("./ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body,{abortEarly: false});
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
}

module.exports.validateReview=(req,res,next)=>{
    console.log("Incoming review:", req.body);
    let {error}=reviewSchema.validate(req.body,{abortEarly: false});
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
}

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in.");
        req.session.redirectUrl=req.originalUrl;
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have premission.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have premission.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};