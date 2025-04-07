const {DataTypes} = require("sequelize");
const sqlInstance = require("../database/mysql");
const sequelize = sqlInstance.sequelize;

const Users = require('../modules/admin/users/users-schema').Users;

const units = sequelize.define('units', {
    unit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    unit_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    unit_desc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.INTEGER({length: 10}),
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER({length: 10}),
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'units',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

units.belongsTo(
    Users,
    {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'creator',
        constraints: false
    }
);
units.belongsTo(
    Users,
    {
        foreignKey: 'updated_by',
        targetKey: 'id',
        as: 'updater',
        constraints: false
    }
);

module.exports = units
