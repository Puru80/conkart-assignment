const {DataTypes} = require("sequelize");
const sqlInstance = require("../../../database/mysql");
const util = require("util");
const sequelize = sqlInstance.sequelize;
const Validator = require('jsonschema').Validator
const _validator = new Validator()

const schemas = function () {
};

const Users = sequelize.define("User", {
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

schemas.userRequest = {
    id: '/admin/login',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required:
                true
        },
        password: {
            type: 'string',
            required:
                true
        }
    }
}

schemas.validate = function (object, schema) {
    const errors = _validator.validate(object, schema).errors
    if (errors.length > 0) {
        console.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors))
    }
    return errors.length <= 0
}

module.exports = {Users, schemas};
