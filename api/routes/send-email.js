const express = require('express');
const router = express.Router();
const SendEmailController = require('../controllers/send-email');

router.post('/', SendEmailController.post);

module.exports = router;