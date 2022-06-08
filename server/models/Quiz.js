const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const Question = require('./Question').schema;

let quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input the quiz name'],
  },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema);