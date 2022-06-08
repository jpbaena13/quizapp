require('dotenv').config();
const bcrypt = require ('bcrypt');
const express = require('express');
const functions = require('../functions');
const User = require('../models/User');

const app = express();

/**
 * Authenticate login and return jwt token
 */
app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, userDB) => {
    if (err) return res.status(500).json({ ok: false, err });

    if (!userDB) return res.status(400).json({ ok: false, err: { message: 'User does not exist!' }});

    if (!bcrypt.compareSync(req.body.password, userDB.password)) {
      return res.status(401).json({ ok: false, err: { message: 'Password Incorrect!' }});
    }

    const accessToken = functions.generateAccessToken({ email: req.body.email });
    const refreshToken = functions.generateRefreshToken({ email: req.body.email });
    const user = {
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      tokens: { accessToken, refreshToken }
    };

    res.json({ ok: true, user });
  });
});

/**
 * Logout removing refresh token
 */
app.delete('/logout', (req, res) => {
  functions.removeRefreshToken(req.body.token);
  res.status(204).send('Logged out!');
});

/**
 * Refresh token api
 */
app.post('/token/refresh', (req, res) => {
  if (!functions.includeRefreshTokens(req.body.token)) res.status(400).send('Refresh Token Invalid');
  functions.removeRefreshToken(req.body.token);

  const accessToken = functions.generateAccessToken ({ user: req.body.name });
  const refreshToken = functions.generateRefreshToken ({ user: req.body.name });

  res.json ({ accessToken: accessToken, refreshToken: refreshToken });
});


module.exports = app;