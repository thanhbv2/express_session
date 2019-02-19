const express = require('express');
const loginRoute = require('./login');
const crudUser = require('./crudUser');

const router = express.Router();


/* GET home page. */
router.use('/', crudUser)
router.use('/', loginRoute)

module.exports = router;
