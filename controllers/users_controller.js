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
  // getOne(req, res, next) {
  //   User.findOne({'email': req.params.email}).then((user)=>{
  //     res.json(user);
  //   });
  // },
  getUser(req, res, next){
    User.findOne({'_id': req.decoded._id}).then((user) => {
      res.json(user)
    });
  },
  addSavedItem(req, res, next){
    User.findOneAndUpdate({'_id': req.decoded._id}, {
      email: req.body.updateUser.email,
      password: req.body.updateUser.password,
      name: req.body.updateUser.name,
      state: req.body.updateUser.state,
      city: req.body.updateUser.city,
      zip: req.body.updateUser.zip,
      street: req.body.updateUser.street,
      saved: req.body.updateUser.saved,
      phone: req.body.updateUser.phone
    }).then(()=>{
      User.findOne({'_id': req.decoded._id}).then((user) => {
        //console.log(user)
        res.json(user);
      })
    })
  },






};
