const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const jwt = require('jsonwebtoken');



module.exports = {

  getAll(req, res, next) {
      Post.find().then((posts)=>{
        res.json(posts);
      });
  }
};
