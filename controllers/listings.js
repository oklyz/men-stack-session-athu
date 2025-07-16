const Listing = require("../models/listings")

// API's

exports.listing_index_get = async (req, res) => {
  const listings = await Listing.find().populate("owner")
  res.render("listings/index.ejs", { listings })
}

exports.listing_create_get = async (req, res) => {
  res.render("listings/new.ejs")
}

exports.listing_create_post = async (req, res) => {
  req.body.owner = req.session.user._id
  await Listing.create(req.body)
  res.redirect("/listings")
}

exports.listing_show_get = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate("owner")

  const userHasFavorited = listing.favriotedByUsers.some((user) => {
    return user.equals(req.session.user._id)
  })
  console.log(userHasFavorited)

  res.render("listings/show.ejs", { listing , userHasFavorited})
}

exports.listing_edit_get = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate("owner")
  res.render("listings/edit.ejs", { listing })
}

exports.listing_update_get = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    req.params.listingId,
    req.body
  )
  res.redirect(`/listings/${listing._id}`)
}

exports.listing_delete_delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.listingId)

  res.redirect(`/listings/`)
}

exports.fav_create_post = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingId, {
    $push: {favriotedByUsers: req.params.userId}
  })
  res.redirect(`/listings/${req.params.listingId}`)
}

exports.fav_delete_post = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingId , {
    $pull: {favriotedByUsers: req.params.userId}
  })
  res.redirect(`/listings/${req.params.listingId}`)
}


