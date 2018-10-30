const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const isEmpty = require("../../validation/is-empty");
const mongoose = require("mongoose");

// Load profile Model
const Profile = require("../../models/Profile");
// Load user Model
const User = require("../../models/User");

// @route       GET api/profiles
// @desc        Get current user profile
// @acces       Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (isEmpty(profile)) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       POST api/profiles
// @desc        Create user profile
// @acces       Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    console.log("paso");
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.location) profileFields.location = req.body.location;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!isEmpty(profile)) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        } else {
          // Create

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
