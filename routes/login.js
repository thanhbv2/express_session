const express = require('express');
const router = express.Router();

const data = [
  { id: 1, username: 'test1', password: '123' },
  { id: 2, username: '007', password: '123' },
  { id: 3, username: 'test2', password: '123' },
  { id: 4, username: 'test3', password: '123' },
  { id: 5, username: 'test4', password: '123' },
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
  if (!username || !password) {
    return res.status(200).json({ error: { message: 'Username and password is required' } })
  }
  const userInfo = data.find(el => el.username === username);
  if (!userInfo) {
    return res.status(200).json({ error: { message: 'Username invalid' } })
  }

  if (userInfo.password !== password) {
    return res.status(200).json({ error: { message: 'Password invalid' } })
  }

  req.session.userId = userInfo.id;
  res.status(200).json({ message: 'login success' })
});


module.exports = router;
