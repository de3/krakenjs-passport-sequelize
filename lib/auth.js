/**
 * Module that will handle our authentication tasks
 */
'use strict';

const User = require('../models').User;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

exports.config = function(settings) {

};

/**
 * A helper method to retrieve a user from a local DB and ensure that the provided password matches.
 * @param req
 * @param res
 * @param next
 */
exports.localStrategy = function() {

    return new LocalStrategy(function(username, password, done) {
				User
          .findOne({
            where: {
              username: username
            }
          })
          .then(function(users){
            if (bcrypt.compareSync(password, users.dataValues.password)) {
              return done(null, users);
            } else {
              return done('Password mismatch');
            }
          })
          .catch(function(err){
            return done(err);
          });
    });
};

/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.isAuthenticated = function() {

    return function(req, res, next) {
        //access map
        var auth = {
          '/admin': true,
          '/profile': true
          },
          blacklist = {
            'user': {
              '/admin': true
            }
          },
          route = req.url,
          role = (req.user && req.user.role) ? req.user.role : '';
        if (!auth[route]) {
          if (route == '/login' && req.isAuthenticated()) {
            res.redirect('/profile');
          } else {
            next();
          }
          return;
        }
        else if (!req.isAuthenticated()) {
          //If the user is not authorized, save the location that was being accessed so we can redirect afterwards.
          req.session.goingTo = req.url;
          req.flash('error', 'Please log in to view this page');
          res.redirect('/login');
        }
        //Check blacklist for this user's role
        else if (blacklist[role] && blacklist[role][route] === true) {
          var model = {url: route};

          //pop the user into the response
          res.locals.user = req.user;
          res.status(401);

          res.render('errors/401', model);
        } else {
          next();
        }

    };
};

/**
 * A helper method to add the user to the response context so we don't have to manually do it.
 * @param req
 * @param res
 * @param next
 */
exports.injectUser = function() {
    return function injectUser(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next();
    };
};
