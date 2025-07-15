const express = require("express")
require("dotenv").config()
const session = require("express-session")

const app = express()

// Database Configuration
const mongoose = require("./config/db")

// Set the port configurations
const port = process.env.PORT ? process.env.PORT : "3000"

// Require Middlewares
const methodOverride = require("method-override")
const morgan = require("morgan")
const passUserTwoView = require("./middleware/pass-user-2-views")
const isSignin = require("./middleware/is-sign-in")

//Use Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

// Session Configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserTwoView)
//Router
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

app.get("/vip-lounge", isSignin, (req, res) => {
  res.send(`welcome to the party ${req.session.user.username}`)
})
// Require Routes
const authRouter = require("./routes/auth")

// Use Routes
app.use("/auth", authRouter)

app.listen(port, () => {
  console.log(`The app is ready on port ${port}`)
})
