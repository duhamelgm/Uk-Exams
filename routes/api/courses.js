const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateCourseInput = require("../../validation/courses");

// Load Course Model
const Course = require("../../models/Course");
// Load User Model
const User = require("../../models/User");
// Load quiz model
const Quiz = require("../../models/Quiz");

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
    .then(course => {
      res.json(course);
    })
    .catch(err => res.status(404));
});

// @route       GET api/courses/:handle/quiz
// @desc        Get course by handle
// @acces       Public
router.get("/:handle/quiz", (req, res) => {
  Course.findOne({ handle: req.params.handle })
    .then(course => {
      res.json(course);
    })
    .catch(err => res.status(404));
});

//
//        ADMIN ROUTES
//

// @route       POST api/courses
// @desc        Create courses
// @acces       Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => isAdminAuthenticated(req, res, next),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Course.findOne({ handle: req.body.handle }).then(course => {
      if (course) {
        res.status(400).json({ handle: "Handle exists" });
      } else {
        const course = new Course({
          handle: req.body.handle,
          title: req.body.title,
          description: req.body.description,
          plans: req.body.plans
        });

        course
          .save()
          .then(course => {
            for (quiz in req.body.quiz) {
              let newQuiz = new Quiz({
                course: course._id,
                question: req.body.quiz[quiz].question,
                optionA: req.body.quiz[quiz].optionA,
                optionB: req.body.quiz[quiz].optionB,
                optionC: req.body.quiz[quiz].optionC,
                optionD: req.body.quiz[quiz].optionD,
                answerOption: req.body.quiz[quiz].answerOption,
                answerDescription: req.body.quiz[quiz].answerDescription
              });

              newQuiz.save().catch(err => console.log(err));
            }
            res.json(course);
          })
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

// @route       POST api/courses/:handle
// @desc        Update course
// @acces       Private
router.post(
  "/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => isAdminAuthenticated(req, res, next),
  (req, res) => {
    const course = {
      handle: req.body.handle,
      title: req.body.title,
      description: req.body.description,
      plans: req.body.plans
    };

    Course.findOneAndUpdate(
      { handle: req.params.handle },
      { $set: course },
      { new: true }
    )
      .then(course => {
        if (!course) res.status(400).json("Error");
        res.json(course);
      })
      .catch(err => res.status(400).json(err));
  }
);

isAdminAuthenticated = (req, res, next) => {
  User.findById(req.user._id).then(user => {
    if (user.range === 0) {
      return next();
    } else {
      res.status(401).json({ err: "not admin user" });
    }
  });
};

module.exports = router;
