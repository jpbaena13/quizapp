require('dotenv').config();
const jwt = require('jsonwebtoken');

// refreshTokens
let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '40m' });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

const includeRefreshTokens = (token) => {
  return refreshTokens.includes(token);
}

const removeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t != token);
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader === undefined) return res.status(400).send('Authorization not present');
  const token = authHeader.split(' ')[1];
  if (token === null) return res.status(400).send('Token not present');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) { 
      res.status(403).send('Token invalid');
    } else {
      req.user = user;
      next();
    }
  });
}

exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.includeRefreshTokens = includeRefreshTokens;
exports.removeRefreshToken = removeRefreshToken;
exports.validateToken = validateToken;