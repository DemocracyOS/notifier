const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', userSchema);