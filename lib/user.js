'use strict';

var UserLibrary = function() {
    return {
        serialize: function(user, done) {
            done(null, user.dataValues);
        },
        deserialize: function(user, done) {
            done(null, user);
        }
    };
};

module.exports = UserLibrary;
