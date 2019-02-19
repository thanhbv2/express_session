const express = require('express');
const router = express.Router();

const data = [
  { username: 'test1', password: '123' },
  { username: '007', password: '123' },
  { username: 'test2', password: '123' },
  { username: 'test3', password: '123' },
  { username: 'test4', password: '123' },
]
/* GET users listing. */
router.get('/login', loginRequired, function (req, res, next) {
  res.render('login', { title: "Login Page" });
});


function loginRequired(req, res, next) {
  if (req.isLogin) {
    return res.redirect('/')
  }

  next();
}

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const userInfo = data.find(el => el.username === username);
  let redirectTo = '/login';
  req.session.userId = 1

  res.redirect('/')
});


module.exports = router;
