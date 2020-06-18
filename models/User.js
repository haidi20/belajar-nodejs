const User = (connection, sequelize) => connection.define('User', {
    name: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: 'ahoy',
    },
    email: sequelize.STRING,
    password: sequelize.STRING,
    address: sequelize.STRING,
});

module.exports = User;