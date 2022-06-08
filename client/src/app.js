import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Popup from 'unc-react-creator/dist/Containers/Popup';

import PrivateRoute from './widgets/PrivateRoute';
import PublicRoute from './widgets/PublicRoute';
import reducers from './redux/reducers';

import WelcomePage from './pages/WelcomePage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import QuizListPage from './pages/QuizListPage';
import QuizPage from './pages/QuizPage';
import QuizPlayPage from './pages/QuizPlayPage';

import 'antd/dist/antd.css';
import './assets/sass/app.scss';

const App = () => (
  <Routes>
    <Route exact path='/' element={<PublicRoute />}>
      <Route exact path='/' element={<WelcomePage />} />
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/register' element={<RegisterPage />} />
    </Route>

    <Route exact path='/' element={<PrivateRoute />}>
      <Route exact path='/quiz' element={<QuizListPage />} />
      <Route exact path='/quiz/:id' element={<QuizPage />} />
      <Route exact path='/quiz/:id/play' element={<QuizPlayPage />} />
    </Route>
  </Routes>
);

/* eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const store = createStore(
  reducers,
  {},
  composeSetup(applyMiddleware(thunk))
);

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <Popup />
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
