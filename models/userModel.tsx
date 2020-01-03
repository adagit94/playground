export {};

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    maxlength: 12
  },
  password: {
    type: Number,
    required: true
  },
  stats: {
    wins: Number,
    lastPlayed: String
  }
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
