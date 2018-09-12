const mongoose = require('mongoose');

const agenda = require('../jobs/agenda');
const User = require('../models/user');

exports.post = async (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    username: req.body.username      
  });

  try {
    await user.save();
    
    agenda.schedule('in 5 seconds', 'send welcome', { email: user.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}