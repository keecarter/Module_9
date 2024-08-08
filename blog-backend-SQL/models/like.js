const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {}, {
    tableName: 'likes',
    timestamps: false
});

module.exports = Like;
