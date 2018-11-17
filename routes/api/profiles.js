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
// Load course Model
const Course = require("../../models/Course");

// @route       GET api/profiles
// @desc        Get current user profile
// @acces       Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (isEmpty(profile)) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        let num = 0;
        let courses = new Array();

        if (profile.coursesOwned.length > 0) {
          for (let i = 0; i < profile.coursesOwned.length; i++) {
            let id = profile.coursesOwned[i].course;
            Course.findById(id).then(course => {
              if (course) {
                profile.coursesOwned[i] = course;
              }
              num++;

              if (num === profile.coursesOwned.length) {
                res.json(profile);
              }
            });
          }
        } else {
          res.json(profile);
        }
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

// @route       GET api/profiles/course-buy/handle/profileId
// @desc        Return url after buying a course
// @acces       Public
router.get("/course-buy/:handle/:profileId", (req, res) => {
  let profileFields = {};
  console.log("Hay algo");

  // Find profile for that user
  Profile.findById(req.params.profileId)
    .then(profile => {
      // Find the course
      Course.findOne({ handle: req.params.handle }).then(course => {
        //If course not exist return 404
        if (!course) res.json(404);

        // Get the token for the payment
        let url = req.protocol + "://" + req.get("host") + req.originalUrl;
        let hashes = url.slice(url.indexOf("?") + 1).split("&");
        let params = {};
        hashes.map(hash => {
          let [key, val] = hash.split("=");
          params[key] = decodeURIComponent(val);
        });

        // Search for the payment token in the profile
        profileFields = profile;
        let finded = false;

        for (let i = 0; i < profileFields.coursesOwned.length; i++) {
          if (profileFields.coursesOwned[i].paymentToken === params.token) {
            profileFields.coursesOwned[i].course = course._id;
            finded = true;
          }
        }

        if (finded) {
          // Add course to the profile
          Profile.findByIdAndUpdate(
            req.params.profileId,
            { $set: profileFields },
            { new: true }
          )
            .then(profile =>
              res.redirect(req.protocol + "://" + "localhost:3000")
            )
            .catch(err => console.log(err));
        } else {
          return res.redirect(req.protocol + "://" + "localhost:3000");
        }
      });
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
