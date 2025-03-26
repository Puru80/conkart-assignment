const {DataTypes} = require("sequelize");
const sqlInstance = require("../../../database/mysql");
const util = require("util");
const sequelize = sqlInstance.sequelize;
const Validator = require('jsonschema').Validator
const _validator = new Validator()

const schemas = function () {
}

const Brands = sequelize.define("Brand", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'brands'
    }
);
