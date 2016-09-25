'use strict';

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/admin', function (req, res) {
    res.send('ini admin');
  });

  router.get('/logout', function (req, res) {
    req.logout('/');
    res.redirect('/login');
  });

};
