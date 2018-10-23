const express = require('express');
const fs = require('fs')
const router = express.Router();

router.get('/:type', (req, res, next) => {
    if (!fs.existsSync(`templates/${req.params.type}.js`)) return next()

    const template = require(`../../templates/${req.params.type}`);
    res.send(template(req.query))
});

module.exports = router;