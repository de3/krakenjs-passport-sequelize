'use strict';

const User = require('../../models').User;

module.exports = function (router) {
    router.get('/', function (req, res) {
        const userId = req.user.id;
        User
          .findById(userId)
          .then(function(user){
            res.json(user);
          })
          .catch(function(err){
            res.send('user not found');
          });
    });
};
