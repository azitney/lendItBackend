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
      description: req.body.newPost.description,
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
  },



editPost(req, res, next){
    Post.findOneAndUpdate({'_id': req.body.editItemPost._id}, {
      title: req.body.editItemPost.title,
      description: req.body.editItemPost.description,
      rate: req.body.editItemPost.rate,
      image: req.body.editItemPost.image,
      category: req.body.editItemPost.category
    }).then(()=>{
      Post.find().then((posts) => {
        res.json(posts);
      })
    })
  },

  deletePost(req, res, next){
    console.log(req.params.id)
    Post.remove({'_id': req.params.id}).then(() => {
      Post.find().then((posts) => {
        res.json(posts);
      })
    })

  }


};
