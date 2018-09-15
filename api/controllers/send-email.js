const { INTERNAL_SERVER_ERROR, OK } = require('http-status');

const agenda = require('../jobs/agenda')

exports.post = async (req, res) => {
  try {
    const { email } = req.body;

    agenda.now('send welcome', { email })

    res.status(OK).json({
      message: 'Email scheduled'
    })
  } catch (err) {
    res.status(500).json(INTERNAL_SERVER_ERROR);
  }
}