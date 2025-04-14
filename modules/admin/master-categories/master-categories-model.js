const masterCategoryModel = require('../../../models/master-categories').masterCategories
const logger = require('../../../utils/logger')
const util = require('util')

const masterCategory = function () {

}

masterCategory.getAllMasterCategories = async () => {
    try {
        const masterCategories = await masterCategoryModel.findAll()

        if (!masterCategories) {
            return {success: true, data: {}, error: "Master Categories not found"}
        }

        return {success: true, data: masterCategories}
    } catch (error) {
        logger.error(util.format('Error in masterCategory.getMasterCategories while fetching all master categories. Error: %j', error.message))
        throw new Error(error)
    }
}

masterCategory.getMasterCategoryDetails = async (requestData) => {
    try {
        const masterCategoryDetails = await masterCategoryModel.findOne({
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

masterCategory.getMasterCategoryByName = async (requestData) => {
    try {
        const masterCategoryDetails = await masterCategoryModel.findOne({
            where: {
                master_category_name: requestData.master_category_name
            }
        })

        if (!masterCategoryDetails) {
            return {success: true, error: "Master Category not found"}
        } else {
            return {success: true, data: masterCategoryDetails}
        }
    } catch (error) {
        logger.error(util.format('Error in masterCategory.getMasterCategoryByName while fetching master category details. Error: %j', error.message))
        throw new Error(error)
    }
}

masterCategory.createMasterCategory = async (requestData) => {
    try {
        const masterCategoryDetails = await masterCategoryModel.create({
            master_category_name: requestData.master_category_name,
            master_category_description: requestData.master_category_description,
            created_by: requestData.user.user_id,
            is_active: requestData.is_active ? requestData.is_active : true,
        })

        console.log("masterCategoryDetails", masterCategoryDetails);

        if (masterCategoryDetails) {
            return {success: true, data: masterCategoryDetails}
        } else {
            return {success: false, error: "Master Category not created"}
        }
    } catch (error) {
        logger.error(util.format('Error in masterCategory.createMasterCategory while creating master category. Error: %j', error.message))
        throw new Error(error)
    }
}

masterCategory.update = async (requestData) => {
    try {
        const masterCategoryUpdated = await masterCategoryModel.update(
            {
                master_category_name: requestData.master_category_name,
                master_category_description: requestData.master_category_description,
                is_active: requestData.is_active,
                updated_by: requestData.user.user_id
            },
            {
                where: {
                    master_category_id: requestData.master_category_id
                }
            }
        )

        console.log("masterCategoryUpdated", masterCategoryUpdated);

        if (masterCategoryUpdated == null || masterCategoryUpdated[0] == 0) {
            return {success: true, error: "Master Category not updated"}
        } else {
            const masterCategoryDetails = await masterCategoryModel
                .findByPk(requestData.master_category_id)

            if (!masterCategoryDetails) {
                return {success: true, data: {}, error: "Master Category not found"}
            } else {
                return {success: true, data: masterCategoryDetails}
            }
        }
    } catch (error) {
        logger.error(error)
        logger.error(util.format('Error in masterCategory.update while updating master category details. Error: %j', error.message))
        throw new Error(error)
    }
}

module.exports = masterCategory
