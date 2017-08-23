module.exports = (sequelize, DataTypes) => sequelize.define(
    'post',
    {
        title: {type: DataTypes.STRING, validate: {notEmpty: true}},
        message: {type: DataTypes.TEXT, validate: {notEmpty: true}}
    }
);

