const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input the quiz name'],
  },
  description: {
    type: String,
    required: [true, 'Please input the question'],
  },
  answers: {
    type: [String]
  },
  correctAnswer: {
    type: Number
  }
});

module.exports = mongoose.model('Question', questionSchema);