const Units = require('../../../models/master_categories')
const logger = require('../../../utils/logger')
const util = require('util')

const masterCategory = function () {

}

masterCategory.getAllMasterCategories = async (requestData) => {
    try {
        const units = Units.findAll()

        if(!units) {
            return {success: true, data: {}, error: "Master Categories not found"}
        }

        return {success: true, data: units}
    } catch (error) {
        logger.error(util.format('Error in masterCategory.getMasterCategories while fetching all master categories. Error: %j', error.message))
        throw new Error(error)
    }
}

masterCategory.getMasterCategoryDetails = async (requestData) => {
    try {
        const masterCategoryDetails = await Units.findOne({
            where: {
                master_category_id: requestData.master_category_id
            }
        })

        if (!masterCategoryDetails) {
            return {success: true, data: {}, error: "Master Category not found"}
        } else {
            return {success: true, data: masterCategoryDetails}
        }
    } catch (error) {
        logger.error(util.format('Error in masterCategory.getMasterCategoryDetails while fetching master category details. Error: %j', error.message))
        throw new Error(error)
    }
}

masterCategory.update = async (requestData) => {
    try {
        return await Units.update(
            {
                master_category_name: requestData.master_category_name,
                master_category_description: requestData.master_category_description,
                is_active: requestData.is_active
            },
            {
                where: {
                    master_category_id: requestData.master_category_id
                }
            }
        )
    } catch (error) {
        logger.error(util.format('Error in masterCategory.update while updating master category details. Error: %j', error.message))
        throw new Error(error)
    }
}

module.exports = masterCategory
