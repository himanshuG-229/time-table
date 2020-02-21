const express = require('express');
const router = express.Router();
var controller = require('../controller/time-table')

router.get('/time-table/class/:class', controller.processTimetable);


module.exports = router;