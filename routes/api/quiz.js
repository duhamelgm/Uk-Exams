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

      Quiz.countDocuments({ course: course._id })
        .then(num => {
          Quiz.find({ course: course._id }).then(quiz => {
            let quizes = [];
            for (let i = 0; i < 5; i++) {
              quizes.push(quiz[Math.floor(Math.random() * num)]);
            }
            res.json(quizes);
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;
