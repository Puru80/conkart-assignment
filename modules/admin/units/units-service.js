const constants = require('../../../utils/constants')
const schemas = require('./units-schema')
const unit = require('./units-model')

const service = function () { }

service.addUnit = async function (req, res) {
    if (schemas.validate(req, schemas.addUnit)) {
        try {
        requestDetails.user = req.user
        const requestsList = await unit.addUnit(requestDetails)
        if (requestsList.unit_id) {
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: requestsList
            })
        } else if (requestsList.same_value) {
            res.status(constants.httpStatusCode.failedOperation).send({
            code: constants.responseCodes.failedOperation,
            message: requestsList.same_value
            })
        } else {
            res.status(constants.httpStatusCode.failedOperation).send({
            code: constants.responseCodes.failedOperation,
            message: requestsList.error
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
        return res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.revalidation,
        message: constants.messageKeys.en.msg_revalidate
        })
    }
}
