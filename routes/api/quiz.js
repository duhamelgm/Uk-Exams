const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load course model
const Course = require("../../models/Course");
// Load quiz model
const Quiz = require("../../models/Quiz");

// @route       GET api/quiz/:handle
// @desc        Get current user profile
// @acces       Private
router.get("/:handle", (req, res) => {
  Course.findOne({ handle: req.params.handle })
    .then(course => {
      if (!course) res.status(404);
      Quiz.find({ course: course._id })
        .then(quiz => {
          if (!quiz) res.status(404);

          res.json(quiz);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
