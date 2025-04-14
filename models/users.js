const {DataTypes} = require("sequelize");
const sqlInstance = require("../database/mysql");
const sequelize = sqlInstance.sequelize;

const Users = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'users'
    }
);

module.exports = {Users};
