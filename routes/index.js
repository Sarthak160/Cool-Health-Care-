const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load User model
const PUser = require('../models/Patient');
const DUser = require('../models/Doctor');

//Homepage
router.get('/', (req, res) => (
  res.render("homepage")
))

// Register/Login Page
router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/users/Patient', (req, res) => res.render('Patient'));
router.get('/users/Doctor', (req, res) => res.render('Doctor'));




// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {

  let userPrototype = Object.getPrototypeOf(req.user);

  if (userPrototype === PUser.prototype) {
    res.render('Pdashboard', { user: req.user });
  } else if (userPrototype === DUser.prototype) {
    res.render("Ddashboard", { user: req.user });
  }
});


module.exports = router;
