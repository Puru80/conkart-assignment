const {constants} = require('../../../utils/constants')
const schemas = require('./master-categories-schema')
const masterCategory = require('./master-categories-model')

const service = function () {
}

service.create = async function (req, res) {
    if (schemas.validate(req.body, schemas.createMasterCategory)) {
        try {
            const requestData = req.body;
            console.log("requestData: ", requestData);

            // Check if the master category already exists
            const existingCategory = await masterCategory.getMasterCategoryByName(requestData);
            console.log("existingCategory: ", existingCategory);

            if (existingCategory && existingCategory.data) {
                return res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.conflict,
                    message: "Master Category already exists"
                });
            }

            const masterCategoryDetails = await masterCategory.createMasterCategory(requestData);

            if (masterCategoryDetails.data.dataValues) {
                if (masterCategoryDetails.data.dataValues.master_category_id) {
                    res.status(constants.httpStatusCode.success)
                        .send({
                            code: constants.responseCodes.successfulOperation,
                            message: "Master Category created successfully",
                            data: masterCategoryDetails
                        })
                } else {
                    res.status(constants.httpStatusCode.failedOperation).send({
                        code: constants.responseCodes.failedOperation,
                        message: constants.messageKeys.en.msg_failed
                    })
                }
            }

        } catch (error) {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed
            })
        }
    } else {
        // Incomplete Data
        return res.status(constants.httpStatusCode.badRequest).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate
        })
    }
}

service.getMasterCategories = async function (req, res) {
    try {
        const masterCategories = await masterCategory.getAllMasterCategories();
        console.log("masterCategories: ", masterCategories);
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: "Master Categories fetched successfully",
            data: masterCategories.data
        })
    } catch (error) {
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.failedOperation,
            message: constants.messageKeys.en.msg_failed
        })
    }
}

service.getMasterCategoryDetails = async function (req, res) {
    if (schemas.validate(req, schemas.getMasterCategoryDetails)) {
        try {
            const requestData = req.body;
            const masterCategoryDetails = await masterCategory.getMasterCategoryDetails(requestData);
            console.log("masterCategoryDetails: ", masterCategoryDetails);

            if (masterCategoryDetails.error) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.notFound,
                    message: "Category not found"
                })
            } else {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Master Category fetched successfully",
                    data: masterCategoryDetails.data
                })
            }
        } catch (error) {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed
            })
        }
    } else {
        // Incomplete Data
        return res.status(constants.httpStatusCode.badRequest).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate
        })
    }
}

service.updateMasterCategory = async function (req, res) {
    const requestData = req.body;
    requestData.master_category_id = requestData.master_category_id ? parseInt(requestData.master_category_id) : requestData.master_category_id
    if (requestData.is_active === 0 || requestData.is_active === '0' || requestData.is_active === false || requestData.is_active === 'false') {
        requestData.is_active = false
    }
    if (requestData.is_active === 1 || requestData.is_active === '1' || requestData.is_active === true || requestData.is_active === 'true') {
        requestData.is_active = true
    }
    if (schemas.validate(req.body, schemas.updateMasterCategory)) {
        try {
            // Check if the master category exists
            const existingCategory = await masterCategory.getMasterCategoryDetails(requestData);

            if (existingCategory && existingCategory.error) {
                console.log("Master Does NOT Category Exist")
                return res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.notFound,
                    message: "Master Category not found"
                });
            }

            const masterCategoryDetails = await masterCategory.update(requestData);
            console.log("masterCategoryDetails: ", masterCategoryDetails);

            if (masterCategoryDetails.error) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.failedOperation,
                    message: constants.messageKeys.en.msg_failed
                })
            } else {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Master Category updated successfully",
                    data: masterCategoryDetails.data
                })
            }
        } catch (error) {
            console.log("Error: ", error);
            res.status(constants.httpStatusCode.failedOperation).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed
            })
        }
    } else {
        // Incomplete Data
        return res.status(constants.httpStatusCode.badRequest).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate
        })
    }
}

module.exports = service;
