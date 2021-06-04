const host = process.env.HOST;
const database = process.env.DATABASE;
const user = process.env.DBUSER;
const password = process.env.DBPASSWORD;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    host: host
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;