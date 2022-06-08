import {
  SET_AUTH_USER
} from '../action-types';

const initialState = {
  authUser: localStorage.authUser && JSON.parse(localStorage.authUser)
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_USER:
      if (action.payload.user === undefined) {
        localStorage.removeItem('authUser');
        document.location.href = '/#/login';
      } else {
        localStorage.authUser = JSON.stringify(action.payload.user);
      }

      return { ...state, authUser: action.payload.user };

    default:
      return state;
  }
};

export default userReducer;
