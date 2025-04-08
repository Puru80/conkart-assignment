const {constants} = require('../../../utils/constants')
const schemas = require('./master-categories-schema')
const masterCategory = require('./master-categories-model')

const service = function () {
}

service.getMasterCategories = async function (req, res) {
    try {
        const masterCategories = await masterCategory.getAllMasterCategories();
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: "Master Categories fetched successfully",
            data: masterCategories
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
            const masterCategoryDetails = await masterCategory.getMasterCategoryDetails(req);

            if (masterCategoryDetails.success) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Category fetched successfully",
                    data: masterCategoryDetails.data
                })
            } else {
                res.status(constants.httpStatusCode.notFound).send({
                    code: constants.responseCodes.notFound,
                    message: "Category not found"
                })
            }
        } catch (error) {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed
            })
        }
    }
}

service.updateMasterCategory = async function (req, res) {
    if(schemas.validate(req.body, schemas.updateMasterCategory)) {
        try {
            const requestData = req.body;
            const masterCategoryDetails = await masterCategory.updateMasterCategory(requestData);

            if (masterCategoryDetails) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Master Category updated successfully",
                    data: masterCategoryDetails
                })
            } else {
                res.status(constants.httpStatusCode.notFound).send({
                    code: constants.responseCodes.notFound,
                    message: "Master Category not found"
                })
            }
        } catch (error) {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed
            })
        }
    }
}

module.exports = service;
