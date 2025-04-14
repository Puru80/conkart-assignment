const {DataTypes} = require("sequelize");
const sqlInstance = require("../database/mysql");
const sequelize = sqlInstance.sequelize;

const masterCategories = sequelize.define("master_categories", {
    master_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    master_category_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    master_category_description: {
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
        allowNull: true
    },
    updated_by: {
        type: DataTypes.INTEGER({length: 10}),
        allowNull: true
    }
}, {
    tableName: 'master_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})


module.exports = {masterCategories};


