const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InquireSchema = new Schema({
  startDate: String,
  endDate: String,
  inquireChecked: Boolean,
  confirmationChecked: Boolean,
  confirmed: Boolean,
  inquiredById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  confirmationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  },
});

mongoose.model('inquire', InquireSchema);
