const express = require('express');
const router = express.Router();


router.use('/api/v3/app',require('./event'))

module.exports = router;