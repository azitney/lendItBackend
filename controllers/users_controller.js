const mongoose = require('mongoose')
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');


module.exports = {
  create(req, res, next) {
    const userProps = req.body;
    User.create(userProps).then((user)=>{
      res.json({token: jwt.sign({_id:user._id}, "mysuperduperbackend")});
    });
  },
  login(req, res, next) {
    User.findOne({'email': req.params.email}).then((user)=>{
      res.json({token: jwt.sign({_id:user._id}, "mysuperduperbackend"), user});
    });
  },
  getOne(req, res, next) {
    User.findOne({'email': req.params.email}).then((user)=>{
      res.json(user);
    });
  },

};
