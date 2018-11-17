const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourseInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.smalldescription = !isEmpty(data.smalldescription)
    ? data.smalldescription
    : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.smalldescription, { min: 30, max: 250 })) {
    errors.smalldescription =
      "Small description must be between 30 and 250 characters";
  }
  if (Validator.isEmpty(data.smalldescription)) {
    errors.smalldescription = "Small description field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLowercase(data.handle)) {
    errors.handle = "Handle name must be lowercased";
  }
  if (!Validator.isAlphanumeric(data.handle)) {
    errors.handle = "Handle can't contain special characters";
  }
  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  /*
  if (Array.isArray(data.categories)) {
    for (let i = 0; i < data.categories.length; i++) {
      let question = data.categories[i];
      if (isEmpty(question)) {
        errors.quiz = "All the rows of the quiz needs information";
      } else {
        question.answerOption = !isEmpty(question.answerOption)
          ? question.answerOption
          : "";
        question.question = !isEmpty(question.question)
          ? question.question
          : "";
        question.optionA = !isEmpty(question.optionA) ? question.optionA : "";
        question.optionB = !isEmpty(question.optionB) ? question.optionB : "";
        question.optionC = !isEmpty(question.optionC) ? question.optionC : "";
        question.optionD = !isEmpty(question.optionD) ? question.optionD : "";
        question.optionE = !isEmpty(question.optionE) ? question.optionE : "";
        question.answerDescription = !isEmpty(question.answerDescription)
          ? question.answerDescription
          : "";

        if (Validator.isEmpty(question.optionA)) {
          if (Validator.isEmpty(question.optionB)) {
            if (Validator.isEmpty(question.optionC)) {
              if (Validator.isEmpty(question.optionD)) {
                if (Validator.isEmpty(question.optionE)) {
                  errors.quiz = `Seems like the row ${question.row +
                    1} doesn't have any options (If there is nothing in that row just be sure that there are not white spaces in any field)`;
                }
              }
            }
          }
        }

        if (Validator.isEmpty(question.answerOption)) {
          errors.quiz = `Seems like the question ${question.row +
            1} that doesn't have a answer (If there is nothing in that row just be sure that there are not white spaces in any field)`;
        }

        if (Validator.isEmpty(question.answerDescription)) {
          errors.quiz = `Seems like the row ${question.tow +
            1} doesn't have a proper description (If there is nothing in that row just be sure that there are not white spaces in any field)`;
        }

        if (Validator.isEmpty(question.question)) {
          errors.quiz = `Seems like the row ${question.row +
            1} doesn't have a question (If there is nothing in that row just be sure that there are not white spaces in any field)`;
        }
      }
    }
  } else {
    errors.categories = "At least one category is required";
  }*/

  if (Array.isArray(data.plans)) {
    if (data.plans.length > 0) {
      for (plan in data.plans) {
        let current = data.plans[plan];

        current.title = !isEmpty(current.title) ? current.title : "";
        current.frequency = !isEmpty(current.frequency)
          ? current.frequency
          : "";
        current.price = !isEmpty(current.price) ? current.price : "";

        if (Validator.isEmpty(current.title)) {
          errors.plans = [];
          errors.plans[plan] = {};
        } else if (Validator.isEmpty(current.frequency)) {
          errors.plans = [];
          errors.plans[plan] = {};
        } else if (Validator.isEmpty(current.price)) {
          errors.plans = [];
          errors.plans[plan] = {};
        }

        if (Validator.isEmpty(current.title)) {
          errors.plans[plan].title = "Title is required";
        }
        if (Validator.isEmpty(current.frequency)) {
          errors.plans[plan].frequency = "Frequency is required";
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
