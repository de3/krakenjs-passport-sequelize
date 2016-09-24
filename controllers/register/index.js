'use strict';
const passport = require('passport');
const validate = require('express-validation');
const validation = require('../../lib/validation');
const User = require('../../models/').User;
const bcrypt = require('bcrypt');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.render('register');
  });

  router.post('/', validate(validation.registration), function(req, res){
    const body = req.body;
    const hash = bcrypt.hashSync(body.password, 10);
    const data = {
      'username': body.username,
      'password': hash
    };
    User
      .create(data)
      .then(function(result){
        req.flash('info', 'Account success created with id: ' + result.dataValues.id);
        res.redirect('/login');
      })
      .catch(function(err){
        res.json(err.errors);
      });
  });
};
