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
      subscription: {
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("courses", CourseSchema);
