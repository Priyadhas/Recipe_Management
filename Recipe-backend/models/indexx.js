const { Sequelize,DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize('Recipe','postgres','qwert@123',{
  host:'localhost',
  dialect: 'postgres'
});

let db={};
const User = require('../models/user')(sequelize, DataTypes);
const Recipee = require('../models/recipe')(sequelize, DataTypes);
db.sequelize = sequelize;
db.User=User;
db.Recipee=Recipee;
module.exports =db;