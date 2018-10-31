const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuizSchema = new Schema({
  courseHandle: {
    type: String,
    required: true
  },
  quiz: [
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
});

module.exports = Quiz = mongoose.model("quiz", QuizSchema);
