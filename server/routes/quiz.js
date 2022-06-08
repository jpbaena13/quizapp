const bcrypt = require ('bcrypt');
const express = require('express');

const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const functions = require('../functions');

const app = express();

//CRUD QUIZ

/**
 * Create a quiz
 */
app.post('/quiz', functions.validateToken, async (req, res) => {
  const quiz = new Quiz({ name: req.body.name });

  quiz.save((err, quizDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({ ok: true, quiz: quizDB });
  });
});

/**
 * Read the all quizzes
 */
app.get('/quiz', functions.validateToken, async (req, res) => {
  Quiz.find({}, (err, quizzes) => {
    res.json({ ok: true, quizzes });
  }).populate('questions');
});


/**
 * Read the quiz with the given id.
 */
app.get('/quiz/:id', functions.validateToken, async (req, res) => {
  Quiz.findOne({ _id: req.params.id }, (err, quizDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    if (!quizDB) return res.status(400).json({ ok: false, err: { message: 'Quiz not found' } });
    res.json({ ok: true, quiz: quizDB });
  }).populate('questions');
});

/**
 * Update the quiz .
 */
app.put('/quiz/:id', functions.validateToken, async (req, res) => {
  const quiz = req.body;
  quiz.questions.forEach((question) => {
    if (question.removed) {
      Question.findByIdAndRemove({ _id: question._id }, (err, questionDB) => {
        if (err) console.log({ ok: false, err });
        if (!questionDB) console.log({ ok: false, err: { message: 'Question not found' } });
      });
    } else if (question.modified) {
      Question.findOneAndUpdate({ _id: question._id }, question, (err, questionDB) => {
        if (err) console.log({ ok: false, err });
        if (!questionDB) console.log({ ok: false, err: { message: 'Question not found' } });
      });
    }
  });

  quiz.questions = quiz.questions.filter((q) => q.removed !== true);

  Quiz.findOneAndUpdate(
    { _id: req.params.id },
    quiz,
    { returnOriginal: false }
  )
    .populate('questions')
    .exec((err, quizDB) => {
      if (err) return res.status(400).json({ ok: false, err });
      res.json({ ok: true, quiz: quizDB });
    });
});

/**
 * Remove the quiz with the given id.
 */
app.delete('/quiz/:id', functions.validateToken, async (req, res) => {
  Quiz.findByIdAndRemove({ _id: req.params.id }, (err, quizDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    if (!quizDB) return res.status(400).json({ ok: false, err: { message: 'Quiz not found' } });
    res.json({ ok: true, quiz: quizDB });
  });
});

/**
 * Create a question and add it to the corresponding quiz
 */
app.post('/quiz/:id/question', functions.validateToken, async (req, res) => {
  const question = new Question({
    name: req.body.name,
    description: req.body.description,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer
  });

  question.save(async (err, questionDB) => {
    Quiz.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { questions: question }},
      { returnOriginal: false }
    )
      .populate('questions')
      .exec((err, quizDB) => {
        if (err) return res.status(400).json({ ok: false, err });
        res.json({ ok: true, quiz: quizDB });
      });
  });
});



//CRUD QUESTIONS

/**
 * Read the all questions
 */
app.get('/question', functions.validateToken, async (req, res) => {
  Question.find({}, (err, questions) => {
    res.json({ ok: true, questions });
  });
});

/**
 * Register a question
 */
app.post('/question', async (req, res) => {
});

/**
 * Return the question
 */
app.get('/question/:id', async (req, res) => {
});


module.exports = app;