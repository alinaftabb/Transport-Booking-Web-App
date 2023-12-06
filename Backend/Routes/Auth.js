const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { generateToken } = require('../utils');

// Signup User
router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Please fill in all required fields!' });
    return;
  }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  })
    .then(user => res.json({ success: true, token: generateToken(user) }))
    .catch(err => res.json({ success: false, error: 'Signup Failed' }));
});

//Signin User
router.post('/signin', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ error: 'Missing username or password' });
    return;
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        res.json({ success: false, error: 'User does not exist' });
      } else {
        if (user.password != req.body.password) {
          res.json({ success: false, error: 'Wrong password' });
        } else {
          res.json({ success: true, token: generateToken(user) });
        }
      }
    })
    .catch(err => res.json({ success: false, error: 'Signin Failed' }));
});

module.exports = router;
