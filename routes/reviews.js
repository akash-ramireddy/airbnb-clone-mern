const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isReviewAuthor} = require("../utils/middleware.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//Post Route
router.post("/",validateReview,wrapAsync(async (req,res)=>{
    let review=new Review(req.body.review);
    review.author=req.user._id;
    let listing=await Listing.findById(req.params.id);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${req.params.id}`);
}));

//Delete Review Route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;