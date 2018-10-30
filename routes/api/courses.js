const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Course Model
const Course = require("../../models/Course");

// @route       GET api/courses
// @desc        Get courses
// @acces       Public
router.get("/", (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .then(courses => {
      res.json(courses);
    })
    .catch(err => res.status(404));
});

// @route       GET api/courses/dashboard
// @desc        Get courses for the dashboard
// @acces       Public
router.get("/dashboard", (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .limit(4)
    .then(courses => {
      res.json(courses);
    })
    .catch(err => res.status(404));
});

// @route       GET api/courses/:handle
// @desc        Get course by handle
// @acces       Public
router.get("/:handle", (req, res) => {
  Course.findOne({ handle: req.params.handle })
    .then(course => res.json(course))
    .catch(err => res.status(404));
});

// @route       POST api/courses
// @desc        Create courses
// @acces       Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ handle: req.body.handle }).then(course => {
      if (course) {
        res.status(400).json({ handle: "Handle exists" });
      } else {
        const course = new Course({
          handle: req.body.handle,
          title: req.body.title,
          description: req.body.description,
          plans: req.body.plans,
          quiz: req.body.quiz
        });

        course
          .save()
          .then(course => res.json(course))
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

// @route       POST api/courses/:handle
// @desc        Update course
// @acces       Private
router.post("/:handle", (req, res) => {
  const course = {
    handle: req.body.handle,
    title: req.body.title,
    description: req.body.description,
    plans: req.body.plans,
    quiz: req.body.quiz
  };

  Course.findOneAndUpdate({ handle: req.params.handle }, { $set: { course } })
    .then(course => {
      if (!course) res.status(400).json("Error");
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
