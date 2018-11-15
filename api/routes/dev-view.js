const express = require('express');
const fs = require('fs')
const router = express.Router();

router.get('/:type', (req, res, next) => {
    if (!fs.existsSync(`templates/${req.params.type}.js`)) return next()

    const template = require(`../../templates/${req.params.type}`);
    let props

    try {
        props = JSON.parse(req.query.props)
    } catch (err) {
        console.log(err)
    }

    console.log('props')
    console.log(props)
    console.log('-----------------------------')

    res.send(template(props))
});

module.exports = router;