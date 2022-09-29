const express = require('express');
const router = express.Router();

/* GET: list of ducumentation. */
router.get('/', require('./list'));
router.get('/:path', require('./serve'));

module.exports = router;
