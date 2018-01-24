const mongoose = require('mongoose');
const Inquire = mongoose.model('inquire');
const jwt = require('jsonwebtoken');

module.exports = {

  getInquiriesForUser(req, res, next){
    Inquire.find({confirmationId: req.decoded._id}).then((inquiries) => {
      res.json(inquiries);
    })
  },

  getPostInquiriesForUser(req, res, next){
    Inquire.find({inquiredById: req.decoded._id}).then((inquiries) => {
      res.json(inquiries);
    })
  },

  addInquiry(req, res, next){
    console.log(req.body.newInquiry)
    let newInquire = {
      startDate: req.body.newInquiry.startDate,
      endDate: req.body.newInquiry.endDate,
      inquireChecked: false,
      confirmationChecked: false,
      confirmed: null,
      inquiredById: req.decoded._id,
      confirmationId: req.body.newInquiry.confirmationId,
      postId: req.body.newInquiry.postId
    }
    console.log(newInquire)
    Inquire.create(newInquire).then(()=>{
      //Inquire.find().then((inquiries)=>{
        console.log('done!')
      //})
    });
  },

  confirmInquiry(req, res, next){
    Inquire.findOneAndUpdate({_id: req.body.id}, {$set: {confirmed: true}}).then(()=>{
      Inquire.find({confirmationId: req.decoded._id}).then((inquiries) => {
        res.json(inquiries);
      })
    })
  },

  denyInquiry(req, res, next){
    Inquire.findOneAndUpdate({_id: req.body.id}, {$set: {confirmed: false}}).then(()=>{
      Inquire.find({confirmationId: req.decoded._id}).then((inquiries) => {
        res.json(inquiries);
      })
    })
  },


};
