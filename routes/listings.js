const router = require("express").Router()

const listingCtrl = require("../controllers/listings")

// Router / Call API's
router.get("/", listingCtrl.listing_index_get)
router.get("/new", listingCtrl.listing_create_get)
router.post("/", listingCtrl.listing_create_post)
router.get("/:listingId", listingCtrl.listing_show_get)

router.get("/:listingId/edit", listingCtrl.listing_edit_get)
router.put("/:listingId", listingCtrl.listing_update_get)
router.delete("/:listingId", listingCtrl.listing_delete_delete)

router.post("/:listingId/favorited-by/:userId", listingCtrl.fav_create_post)
router.delete("/:listingId/favorited-by/:userId", listingCtrl.fav_delete_post)
module.exports = router