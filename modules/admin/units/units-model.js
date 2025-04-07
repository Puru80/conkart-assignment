const Units = require('../../../models/units')
const logger = require('../../../utils/logger')
const util = require('util')

const unit = function () {
}

unit.findByName = async (requestData) => {
    try {
        const unit = await Units.findOne({
            where: {
                unit_name: requestData.unit_name
            }
        })

        if (!unit) {
            return {success: true, data: {}, error: "Unit not found"}
        } else {
            return {success: true, data: unit}
        }

    } catch (error) {
        logger.error(util.format('Error in unit.unitAdd while Creating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.unitAdd = async (requestData) => {
    try {
        return await Units.create({
            unit_name: requestData.unit_name,
            unit_desc: requestData.unit_desc ? requestData.unit_desc : null,
            is_active: requestData.is_active ? requestData.is_active : true,
            created_by: requestData.user.id
        })

    } catch (error) {
        logger.error(util.format('Error in unit.unitAdd while Creating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.getAllUnits = async () => {
    try {
        return await Units.findAll({
            where: {
                is_deleted: false
            }
        })
    } catch (error) {
        logger.error(util.format('Error in unit.getAllUnits while fetching all units. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.updateUnit = async (requestData) => {
    try {
        return await Units.update(
            {
                unit_name: requestData.unit_name,
                unit_desc: requestData.unit_desc,
                updated_by: requestData.user.id
            },
            {
                where: {
                    unit_id: requestData.unit_id
                }
            }
        )
    } catch (error) {
        logger.error(util.format('Error in unit.unitUpdate while Updating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.updateStatus = async (requestData) => {
    try {
        return await Units.update(
            {
                is_active: requestData.is_active,
                updated_by: requestData.user.id
            },
            {
                where: {
                    unit_id: requestData.unit_id
                }
            }
        )
    } catch (error) {
        logger.error(util.format('Error in unit.unitUpdate while Updating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.deleteUnit = async (requestData) => {
    try {
        return await Units.destroy({
            where: {
                unit_id: requestData.unit_id
            }
        })
    } catch (error) {
        logger.error(util.format('Error in unit.unitUpdate while Updating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.getUnitDetails = async (requestData) => {
    try {
        return await Units.findOne({
            where: {
                unit_id: requestData.unit_id
            }
        })
    } catch (error) {
        logger.error(util.format('Error in unit.unitUpdate while Updating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

unit.statusManage = async (requestData) => {
    try {
        return await Units.update(
            {
                is_active: requestData.is_active,
                updated_by: requestData.user.id
            },
            {
                where: {
                    unit_id: requestData.unit_id
                }
            }
        )
    } catch (error) {
        logger.error(util.format('Error in unit.unitUpdate while Updating Unit details. Error: %j', error.message))
        throw new Error(error)
    }
}

module.exports = unit
