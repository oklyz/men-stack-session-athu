const router = require("express").Router()
const authCtr = require("../controllers/auth")

// Routes - Call API's
router.get("/sign-up", authCtr.auth_signup_get)
router.post("/sign-up", authCtr.auth_signup_post)

router.get("/sign-in", authCtr.auth_signin_get)
router.post("/sign-in", authCtr.auth_signin_post)

router.get("/sign-out", authCtr.auth_signout_get)

module.exports = router
