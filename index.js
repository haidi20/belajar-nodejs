const express   = require('express');
const sequelize = require('sequelize');
const app       = express();
const port      = 5000;
const Data      = require('./data');

const connection = new sequelize('nodejs', 'phpmyadmin', 'samarinda', {
    dialect: 'mysql',
});

const User      = require('./models/User')(connection, sequelize);
const Post      = require('./models/Post')(connection, sequelize);
const Employe   = require('./models/Employe')(connection, sequelize);

User.hasMany(Post); // 1 : 1 relation

connection.
    sync({
        logging: console.log,
        force: true
    })
    .then(() => {
        console.log('connection to database established successfully.');

        app.listen(port, () => {
            console.log('Running server on prot '+ port);
        });
    })
    .then(() => {
        User.bulkCreate(Data,  {returning: true});
    })
    .then(() => {
        Post.bulkCreate([
                {
                    userId: 1,
                    title: "hello",
                    description: "demo post",
                },
                {
                    userId: 2,
                    title: "hello2",
                    description: "demo post2",
                }
            ]);
    })
    .then(() => {
        Employe
            .create({name: 'keren bambang', title: 'senior enginer'})
            .then(employe => {
                console.log(employe.get('name'));
                console.log(employe.get('title'));
            })
            .catch(err => {
                console.log('unable to coonect ot the database: ', err);
            });
    })
    .catch(err => {
        console.log('unable to coonect ot the database: ', err);
    });