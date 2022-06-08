import {
  SET_QUIZZES,
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ
} from '../action-types';

const initialState = {
  quizzes: undefined
};

const quizReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_QUIZZES:
      return { ...state, quizzes: action.payload.quizzes };

    case CREATE_QUIZ:
      return { ...state, quizzes: [...state.quizzes, action.payload.quiz] };

    case DELETE_QUIZ:
      return { ...state, quizzes: state.quizzes.filter((q) => q._id !== action.payload.quiz._id) }; // eslint-disable-line

    case UPDATE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.map((q) => {
          if (q._id === action.payload.quiz._id) return action.payload.quiz; // eslint-disable-line
          return q;
        })
      };

    default:
      return state;
  }
};

export default quizReducer;
