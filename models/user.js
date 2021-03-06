const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./posts');

const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  state: String,
  city: String,
  zip: Number,
  street: String,
  saved: [{ type: String }],
  phone: Number
})

mongoose.model('users', UserSchema);
