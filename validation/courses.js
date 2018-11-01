const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourseInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Array.isArray(data.quiz)) {
    for (question in data.quiz) {
      if (isEmpty(data.quiz[question])) {
        errors.quiz = "All the rows of the quiz needs information";
      }
    }
  } else {
    errors.quiz = "Quiz is required";
  }

  if (Array.isArray(data.plans)) {
    if (data.plans.length > 0) {
      for (plan in data.plans) {
        let current = data.plans[plan];

        current.title = !isEmpty(current.title) ? current.title : "";
        current.subscription = !isEmpty(current.subscription)
          ? current.subscription
          : "";
        current.price = !isEmpty(current.price) ? current.price : "";

        if (Validator.isEmpty(current.title)) {
          errors.plans = [];
          errors.plans[plan] = {};
        } else if (Validator.isEmpty(current.subscription)) {
          errors.plans = [];
          errors.plans[plan] = {};
        } else if (Validator.isEmpty(current.price)) {
          errors.plans = [];
          errors.plans[plan] = {};
        }

        if (Validator.isEmpty(current.title)) {
          errors.plans[plan].title = "Title is required";
        }
        if (Validator.isEmpty(current.subscription)) {
          errors.plans[plan].subscription = "Subscription is required";
        }
        if (Validator.isEmpty(current.price)) {
          errors.plans[plan].price = "Price is required";
        }
      }
    } else {
      errors.plan = "At least one plan is required";
    }
  } else {
    errors.plan = "At least one plan is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
