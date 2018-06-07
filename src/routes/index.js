'use strict'

const router = require('express').Router({ mergeParams: true });

router.use('/link', require('./link_v1'));
router.use('/link/:encodedid', require('./link_v1'));



module.exports = router;