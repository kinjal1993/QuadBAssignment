const {sequelize,Sequelize} = require('../config/db')

exports.Crypto = sequelize.define("crypto", {
    id: {
        type: Sequelize.TINYINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    name: {
        type: Sequelize.STRING
    },
    base_unit: {
        type: Sequelize.STRING
    },
    last: {
        type: Sequelize.DECIMAL(10, 2)
    },
    buy: {
        type: Sequelize.DECIMAL(10, 2)
    },
    sell: {
        type: Sequelize.DECIMAL(10, 2)
    },
    volume: {
        type: Sequelize.DECIMAL(10, 2)
    }
},
{
  tableName: 'crypto'
});
