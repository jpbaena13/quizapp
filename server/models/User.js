const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'
}

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please input your email'],
  },
  password: {
    type: String,
    required: [true, 'Please input your password'],
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    required: [true],
    enum: roles,
  }
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('User', userSchema);