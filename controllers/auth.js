const User = require("../models/user")
const bcrypt = require("bcrypt")
//API's / Main Functionality
exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username already taken!")
  }

  if (req.body.password !== req.body.confirmpassword) {
    return res.send("password and confirm password must match ...")
  }

  // register the User

  // password Encryption - Ecrypt
  const hashedpassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedpassword

  const user = await User.create(req.body)
  res.send(`Thanks for siging up, ${user.username}`)
}

exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed. Please try again")
  }

  const valipassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!valipassword) {
    return res.send("Login failed. Please try again")
  }

  // User Exist and password matched
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }
  res.redirect("/")
}

exports.auth_signout_get = (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}