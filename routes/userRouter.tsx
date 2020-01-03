export {};

import express from 'express';
import mongoose from 'mongoose';
import * as UserController from '../controllers/UserController';

const router = express.Router();
const mongoDB = 'mongodb://127.0.0.1:27017/db-users';

const db = mongoose.connection;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const testUser = new UserModel({
  username: 'noname',
  password: 123456
});

testUser.save(function(err) {
  if (err) return console.error(err);
});




router.post('user/login', UserController.userLogIn);

router.post('user/create', UserController.userCreate);

module.exports = router;
