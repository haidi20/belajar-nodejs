const Post = (connection, sequelize) => connection.define('Posts', {
    title: sequelize.STRING,
    description: sequelize.STRING
});

module.exports = Post;