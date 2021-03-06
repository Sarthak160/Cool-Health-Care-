const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const DUser = require('../models/Doctor');
const PUser = require('../models/Patient');

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/Patient/login', forwardAuthenticated, (req, res) => res.render('Plogin'));
router.get('/Doctor/login', forwardAuthenticated, (req, res) => res.render('Dlogin'));

// Register Page
router.get('/Patient/register', forwardAuthenticated, (req, res) => res.render('Pregister'));
router.get('/Doctor/register', forwardAuthenticated, (req, res) => res.render('Dregister'));

// Register
//-----------doc-----------
router.post('/Doctor/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    DUser.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new DUser({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/Doctor/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//----------------patient--------------------
router.post('/Patient/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    PUser.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new PUser({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/Patient/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});




// Login
//----------------patient-------------
router.post('/Patient/login', (req, res, next) => {
  passport.authenticate('local-P', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/Patient/login',
    failureFlash: true
  })(req, res, next);
});




//-----------------doctor-----------------
router.post('/Doctor/login', (req, res, next) => {
  passport.authenticate('local-D', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/Doctor/login',
    failureFlash: true
  })(req, res, next);
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
