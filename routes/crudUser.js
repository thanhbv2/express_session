const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.isLogin) {
    return res.redirect('/login')
  }
  res.render('index', { title: 'Home Page' });
});



module.exports = router