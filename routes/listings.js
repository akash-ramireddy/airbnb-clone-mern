const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {validateListing, isLoggedIn, isOwner} = require("../utils/middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../configCloud.js");
const upload = multer({storage});


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/search",wrapAsync(listingController.searchListing));

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

router.get("/category/:category",wrapAsync(listingController.getCategoryListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;