const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");
const mongoose = require("mongoose");

// Load input Validation
const validateRegistrationInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user Model
const User = require("../../models/User");
// Load profile Model
const Profile = require("../../models/Profile");

// @route       POST api/users/register
// @desc        Register user
// @acces       Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!isEmpty(user)) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);

            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const profileFields = {};
                profileFields.user = user.id;

                new Profile(profileFields).save();

                return res.status(200).json(newUser);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// @route       POST api/users/login
// @desc        Login user / returning JWT Token
// @acces       Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      if (!isEmpty(user)) {
        //Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User Matched

            const payload = { id: user.id, name: user.name, range: user.range }; // Create JWT Payload

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Incorrect Password";
            return res.status(400).json(errors);
          }
        });
      } else {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// @route       GET api/users/current
// @desc        Return current user
// @acces       Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
