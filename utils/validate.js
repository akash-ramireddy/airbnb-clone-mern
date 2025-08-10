const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("./ExpressError.js");

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body,{abortEarly: false});
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
};

module.exports.validateReview=(req,res,next)=>{
    console.log("Incoming review:", req.body);
    let {error}=reviewSchema.validate(req.body,{abortEarly: false});
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
};