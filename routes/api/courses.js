const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateCourseInput = require("../../validation/courses");

const createSubscription = require("../../payments/createSubscription");

const isEmpty = require("../../validation/is-empty");

// Load Course Model
const Course = require("../../models/Course");
// Load User Model
const User = require("../../models/User");
// Load Profile Model
const Profile = require("../../models/Profile");
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

// @route       POST api/courses/:handle/buy
// @desc        Buy course subscription
// @acces       Private
router.post(
  "/:handle/buy",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ handle: req.params.handle })
      .then(course => {
        const fullUrl = req.protocol + "://" + req.get("host");
        createSubscription(fullUrl, course, req.body.plan, req.body.profile)
          .then(url => {
            Profile.findOne({ user: req.user._id }).then(profile => {
              // Get the token for the payment
              let hashes = url.slice(url.indexOf("?") + 1).split("&");
              let params = {};
              hashes.map(hash => {
                let [key, val] = hash.split("=");
                params[key] = decodeURIComponent(val);
              });

              // Push the token to the profile
              profile.coursesOwned.push({
                paymentToken: params.token
              });

              // Add the token to the profile
              Profile.findOneAndUpdate(
                { user: req.user._id },
                { $set: profile },
                { new: true }
              ).then(profile => res.status(200).json({ url: url }));
            });
          })
          .catch(err => {
            console.log(err.response);
            res.status(404);
          });
      })
      .catch(err => res.status(404));
  }
);

//
//        EXAM ROUTES
//

// @route       GET api/courses/:handle/exam/info
// @desc        Get current user profile
// @acces       Public
router.get("/:handle/exam/info", (req, res) => {
  Course.findOne({ handle: req.params.handle })
    .then(course => {
      if (!course) res.status(404);

      // Initializing the info array
      const info = new Array();

      // Go through each category
      for (let i = 0; i < course.categories.length; i++) {
        let category = course.categories[i];

        info.push({
          id: category._id,
          title: category.title,
          questionsAmount: category.questions.length
        });
      }

      res.json(info);
    })
    .catch(err => console.log(err));
});

// @route       GET api/courses/:handle/exam/questions
// @desc        Get current user profile
// @acces       Private
router.post(
  "/:handle/exam/questions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) res.status(404);

        // Find the course
        Course.findOne({ handle: req.params.handle })
          .then(course => {
            if (!course) res.status(404);

            // Search if the user have a subscription for the course
            let finded = false;
            for (let i = 0; i < profile.coursesOwned.length; i++) {
              if (
                profile.coursesOwned[i].course.toString() ===
                course._id.toString()
              ) {
                finded = true;
              }
            }

            if (!finded) res.status(401);

            // Query for the questions
            let query = req.body.categories;
            let amount = req.body.amountQuestions;

            let questions = [];

            for (let i = 0; i < course.categories.length; i++) {
              for (let j = 0; j < query.length; j++) {
                if (query[j] === course.categories[i]._id.toString()) {
                  questions.push.apply(
                    questions,
                    course.categories[i].questions
                  );
                }
              }
            }

            // Return the exam with the amount of questions
            let exam = [];

            for (let i = 0; i < amount; i++) {
              finded = false;
              let random = Math.floor(Math.random() * questions.length);

              for (let j = 0; j < exam.length; j++) {
                if (
                  questions[random]._id.toString() === exam[j]._id.toString()
                ) {
                  // The question already was finded
                  i--;
                  finded = true;
                  break;
                }
              }

              if (!finded) {
                exam.push(questions[random]);
              }
            }
            res.json(exam);
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => console.log(err));
  }
);

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

    Course.findOne({ handle: req.body.handle })
      .then(course => {
        if (course) {
          res.status(400).json({ handle: "Handle exists" });
        } else {
          const course = new Course({
            handle: req.body.handle,
            title: req.body.title,
            smalldescription: req.body.smalldescription,
            description: req.body.description,
            plans: req.body.plans,
            categories: req.body.categories
          });

          course
            .save()
            .then(res.json(course))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => console.log(err));
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
