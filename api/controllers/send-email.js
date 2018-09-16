const { INTERNAL_SERVER_ERROR, OK } = require('http-status');

const notification = require('../../core/notification-strategies');

exports.post = async (req, res) => {
  try {
    const { type, info } = req.body; //options to send to strategy    
    notification.sendEmail(type, info);

    res.status(OK).json({
      message: 'Email scheduled'
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'An error ocurred trying to schedule the email.',
      reason: err.message
    });
  }
}