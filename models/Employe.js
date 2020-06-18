const Employe = (connection, sequelize) => connection.define('Employe', {
    name: {
        type: sequelize.STRING,
        allowNull: false,
        get(){
            const title = this.getDataValue('title');

            return `${this.getDataValue('name')} (${title})`;
        }
    },
    title: sequelize.STRING,
});

module.exports = Employe;