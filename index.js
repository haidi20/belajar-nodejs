const express = require('express');
const sequelize = require('sequelize');

const app = express();
const port = 5000;

const connection = new sequelize('nodejs', 'phpmyadmin', 'samarinda', {
    dialect: 'mysql',
});

const User = connection.define('User', {
    uuid: {
        type: sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    name: sequelize.STRING,
    bio: sequelize.TEXT,
});

connection.
    sync({
        logging: console.log,
        force: true
    })
    .then(() => {
        console.log('connection to database established successfully.');
    })
    .catch(err => {
        console.log('unable to coonect ot the database: ', err);
    });

app.listen(port, () => {
    console.log('Running server on prot '+ port);
});