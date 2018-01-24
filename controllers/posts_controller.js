const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const jwt = require('jsonwebtoken');

module.exports = {

  getAll(req, res, next) {
    Post.find().then((posts)=>{
      res.json(posts);
    });
  },
  addPost(req, res, next){
    let newPost = {
      title: req.body.newPost.title,
      descriptiom: req.body.newPost.description,
      rate: req.body.newPost.rate,
      image: req.body.newPost.image,
      category: req.body.newPost.category,
      postedBy: req.decoded._id
    }
    Post.create(newPost).then(()=>{
      Post.find().then((posts)=>{
        res.json(posts);
      })
    });
  }
};
