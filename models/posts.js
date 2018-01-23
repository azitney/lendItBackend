const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  title: String,
  rate: Number,
  description: String,
  image: String,
  category: [{ type: String }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  saved: [{
    text: String,
    savedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  inquired: [{
    text: String,
    inquiredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  confirmed: [{
    text: String,
    confirmedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }]
});

mongoose.model('posts', PostSchema);
