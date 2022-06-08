const bcrypt = require ('bcrypt');
const express = require('express');
const User = require('../models/User');
const functions = require('../functions');

const app = express();

/**
 * Register a user
 */
app.post('/user', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role
  });

  user.save((err, userDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    const accessToken = functions.generateAccessToken({ email: userDB.email });
    const refreshToken = functions.generateRefreshToken({ email: userDB.email });
    const user = {
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      tokens: { accessToken, refreshToken }
    };
    res.json({ ok: true, user });
  });
});


module.exports = app;