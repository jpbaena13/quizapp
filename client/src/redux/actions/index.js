import { message } from 'antd';
import Api from '../../api';

import {
  SET_AUTH_USER,
  SET_QUIZZES,
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ
} from '../action-types';

function headers() {
  const authUser = localStorage.authUser && JSON.parse(localStorage.authUser);
  return { Authorization: `Bearer ${authUser?.tokens.accessToken}` };
}

export function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    payload: { user }
  };
}

export function setQuizzes(quizzes) {
  return {
    type: SET_QUIZZES,
    payload: { quizzes }
  };
}

export function createQuiz(quiz) {
  return {
    type: CREATE_QUIZ,
    payload: { quiz }
  };
}

export function deleteQuiz(quiz) {
  return {
    type: DELETE_QUIZ,
    payload: { quiz }
  };
}

export function updateQuiz(quiz) {
  return {
    type: UPDATE_QUIZ,
    payload: { quiz }
  };
}

// Async functions
export function setAuthUserAsync(values) {
  return async (dispatch) => {
    const response = await Api.user.login(values);
    if (!response.ok) return null;

    dispatch(setAuthUser(response.user));
    return response.user;
  };
}

export function setQuizzesAsync() {
  return async (dispatch) => {
    const response = await Api.quiz.all(headers());
    if (response.status === 403) dispatch(setAuthUser(undefined));
    if (!response.ok) return null;

    dispatch(setQuizzes(response.quizzes));
    return response.quizzes;
  };
}

export function createQuizAsync(quiz) {
  return async (dispatch) => {
    const response = await Api.quiz.create(quiz, headers());
    if (response.status === 403) dispatch(setAuthUser(undefined));
    if (!response.ok) return null;

    message.success('Quiz created succesfully');

    dispatch(createQuiz(response.quiz));
    return response.quiz;
  };
}

export function updateQuizAsync(quiz) {
  return async (dispatch) => {
    const response = await Api.quiz.update(quiz, headers());
    if (response.status === 403) dispatch(setAuthUser(undefined));
    if (!response.ok) return null;

    message.success('Quiz updated succesfully');

    dispatch(updateQuiz(response.quiz));
    return response.quiz;
  };
}

export function deleteQuizAsync(quiz) {
  return async (dispatch) => {
    const response = await Api.quiz.delete(quiz, headers());
    if (response.status === 403) dispatch(setAuthUser(undefined));
    if (!response.ok) return null;

    message.success('Quiz removed succesfully');

    dispatch(deleteQuiz(response.quiz));
    return response.quiz;
  };
}

export function addQuestionAsync({ quiz, question }) {
  return async (dispatch) => {
    const response = await Api.quiz.addQuestion(quiz, question, headers());
    if (response.status === 403) dispatch(setAuthUser(undefined));
    if (!response.ok) return null;

    message.success('Question added succesfully');

    dispatch(updateQuiz(response.quiz));
    return response.quiz;
  };
}
