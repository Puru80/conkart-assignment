const {DataTypes} = require("sequelize");
const sqlInstance = require("../database/mysql");
const sequelize = sqlInstance.sequelize;
const masterCategories = require("./master-categories").masterCategories;
const Users = require('../modules/admin/users/users-schema').Users;

const categories = sequelize.define('categories', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    master_category_id: {
        type: DataTypes.INTEGER({length: 10}),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    measurement: {
        type: DataTypes.DECIMAL(10, 2),
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
    }
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

// categories.hasMany(models.products, {
//     foreignKey: 'category_id',
//     targetKey: 'category_id',
//     constraints: false
// })
// categories.hasOne(models.category_unit_mapping, {
//     foreignKey: 'category_id',
//     sourceKey: 'category_id',
//     constraints: false
// })

categories.belongsTo(Users, {
    foreignKey: 'created_by',
    targetKey: 'admin_user_id',
    as: 'creator',
    constraints: false
})
categories.belongsTo(Users, {
    foreignKey: 'updated_by',
    targetKey: 'admin_user_id',
    as: 'updater',
    constraints: false
})
// categories.hasMany(models.attributes, {
//     foreignKey: 'category_id',
//     targetKey: 'category_id',
//     constraints: false
// })
// categories.hasMany(models.brands, {
//     foreignKey: 'category_id',
//     targetKey: 'category_id',
//     constraints: false
// })

categories.belongsTo(masterCategories,{
    foreignKey: 'master_category_id',
    targetKey: 'master_category_id',
    constraints: false
})

module.exports = {categories};
