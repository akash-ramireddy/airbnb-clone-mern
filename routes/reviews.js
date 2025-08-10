const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isReviewAuthor} = require("../utils/middleware.js");
const reviewController = require("../controllers/reviews.js")

//Post Route
router.post("/",validateReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;