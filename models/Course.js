const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  smalldescription: {
    type: String
  },
  description: {
    type: String
  },
  plans: [
    {
      title: {
        type: String,
        required: true
      },
      frequency: {
        type: String,
        required: true
      },
      interval: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  categories: [
    {
      title: {
        type: String,
        required: true
      },
      questions: [
        {
          question: {
            type: String,
            required: true
          },
          optionA: {
            type: String
          },
          optionB: {
            type: String
          },
          optionC: {
            type: String
          },
          optionD: {
            type: String
          },
          optionE: {
            type: String
          },
          answerOption: {
            type: String,
            required: true
          },
          answerDescription: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("courses", CourseSchema);
