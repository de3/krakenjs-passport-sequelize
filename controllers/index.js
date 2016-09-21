'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    const model = new IndexModel();
    

    router.get('/', function (req, res) {
        
        
        res.render('index', model);
        
        
    });

    router.get('/admin', function (req, res) {

        res.send('ini admin');

    });

};
