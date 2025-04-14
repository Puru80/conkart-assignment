const {DataTypes} = require("sequelize");
const sqlInstance = require("../../../database/mysql");
const util = require("util");
const sequelize = sqlInstance.sequelize;
const Validator = require('jsonschema').Validator
const _validator = new Validator()

const schemas = function () {
};

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

schemas.userRequest = {
    id: '/admin/login',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: true,
            format: 'email',
            errorMessage: {
                type: 'Email must be a string',
                format: 'Invalid email format'
            }
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6,
            errorMessage: {
                type: 'Password must be a string',
                minLength: 'Password must be at least 6 characters long'
            }
        }
    }
}

schemas.validate = function (object, schema) {
    const validationResult = _validator.validate(object, schema);
    const errors = validationResult.errors.map(error => {
        const property = error.property.replace('instance.', '');
        return schema.properties[property].errorMessage[error.name] || error.stack;
    });

    if (errors.length > 0) {
        console.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors;
}

module.exports = {Users, schemas};
