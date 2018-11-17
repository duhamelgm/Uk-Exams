const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const paypal = require("paypal-rest-sdk");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const courses = require("./routes/api/courses");
const quiz = require("./routes/api/quiz");
const keys = require("./config/keys");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

// DB Config
const db = keys.mongoURI;
mongoose.set("useFindAndModify", false);

// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

// Passport middleware

app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);

// Paypal config
paypal.configure({
  mode: keys.mode,
  client_id: keys.client_id,
  client_secret: keys.client_secret
});

// Use Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/courses", courses);
app.use("/api/quiz", quiz);

// Admin routes
app.use("/admin/api/courses", courses);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
