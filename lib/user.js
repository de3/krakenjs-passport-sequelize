'use strict';

var UserLibrary = function() {
    return {
        serialize: function(user, done) {
            console.log(user.dataValues);
            done(null, user);
        },
        deserialize: function(user, done) {
            done(null, user);
        }
    };
};

module.exports = UserLibrary;
