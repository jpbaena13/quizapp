import { combineReducers } from 'redux';

import userReducer from './userReducer';
import quizReducer from './quizReducer';

const reducers = combineReducers({
  userReducer,
  quizReducer
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
