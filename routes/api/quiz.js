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
  Quiz.find({ courseHandle: req.params.handle }).then(quiz => {
    if (quiz) res.json(quiz);
    res.status(404);
  });
});

module.exports = router;
