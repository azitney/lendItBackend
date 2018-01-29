const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const User = mongoose.model('users');
const Inquire = mongoose.model('inquire');
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
    Post.remove({'_id': req.params.id}).then(() => {
      User.find().then((users) => {
        users.map((user) => {
          if(user.saved.includes(req.params.id)){
            let newSaved = user.saved
            if(newSaved.indexOf(req.params.id) === 0){
              newSaved.pop()
            }else{
              newSaved.splice(newSaved.indexOf(req.params.id), 1)
            }
            User.findOneAndUpdate({'_id': user._id}, {
              saved: newSaved
            }).then(()=>{
              console.log("done")
            })
          }
      })
        }).then(() => {
          Inquire.remove({ 'postId' : req.params.id}).then(()=>{
            console.log('inquire removed!')
      })
    })
  }).then(()=>{
    Post.find().then((posts) => {
      User.findOne({'_id': req.decoded._id}).then((user) => {
        Inquire.find({'confirmationId': req.decoded._id}).then((inquiries) => {
          res.json({'user': user, 'posts': posts, 'byConfirmedById': inquiries})
        })
      })
    })
  })
}


};
