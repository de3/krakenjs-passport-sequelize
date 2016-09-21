'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const config = require('../config/config');
let db = {};

const sequelize = new Sequelize(config.databaseConfig.database,
                    config.databaseConfig.username,
                    config.databaseConfig.password,
                    config.databaseConfig.options);

sequelize
  .authenticate()
  .then(function(err){
    if (err) {
      console.log('Unable to conect: ', err);
    } else {
      console.log('connect success');
    }
  });

fs
  .readdirSync(__dirname)
  .filter(function(file){
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file){
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName){
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
