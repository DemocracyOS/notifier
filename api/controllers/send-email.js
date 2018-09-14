const agenda = require('../jobs/agenda')

exports.post = async (req, res) => {
  try {
    const { email } = req.body;

    agenda.schedule('in 5 seconds', 'send welcome', { email })

    res.status(200).json({
      message: 'Email scheduled'
    })
  } catch (err) {
    res.status(500).json(err);
  }
}