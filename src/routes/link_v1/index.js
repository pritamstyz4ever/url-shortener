'use strict';

const router = require('express').Router({ mergeParams: true });

router.post('/', require("./shorten"));
router.get('/', require('./redirect'))


module.exports = router;