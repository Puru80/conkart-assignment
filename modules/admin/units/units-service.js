const {constants} = require('../../../utils/constants')
const schemas = require('./units-schema')
const unit = require('./units-model')

const service = function () {
}

service.addUnit = async function (req, res) {
    if (schemas.validate(req, schemas.addUnit)) {
        try {
            const{unit_name, unit_desc, is_active, user} = req.body

            const exisingUnit = await unit.findByName(unit_name);

            if(exisingUnit.success && exisingUnit.data) {
                return res.status(constants.httpStatusCode.conflict).send({
                    code: constants.responseCodes.conflict,
                    message: "Unit already exists"
                })
            }

            const unitAdded = await unit.unitAdd({
                unit_name,
                unit_desc,
                is_active: is_active ? is_active : true,
                is_deleted: false,
                user
            });

            if (unitAdded.unit_id) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Unit aded successfully",
                    data: unitAdded
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
            message: "Incomplete Data"
        })
    }
}

service.getUnits = async function (req, res) {
    try {
        const units = await unit.getUnits();
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: "Units fetched successfully",
            data: units
        })
    } catch (error) {
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.failedOperation,
            message: constants.messageKeys.en.msg_failed
        })
    }
}

service.getUnitById = async function (req, res) {
    if(schemas.validate(req, schemas.unitDetails)) {
        try {
            const unitDetails = await unit.getUnitDetails(req);

            if (unitDetails.success) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Unit fetched successfully",
                    data: unitDetails.data
                })
            } else {
                res.status(constants.httpStatusCode.notFound).send({
                    code: constants.responseCodes.notFound,
                    message: "Unit not found"
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

service.updateUnit = async function (req, res) {
    if (schemas.validate(req, schemas.updateUnit)) {
        try {
            const {unit_name, unit_desc, is_active, user} = req.body

            const existingUnit = await unit.findByName(unit_name);

            if(existingUnit.success && existingUnit.error) {
                return res.status(constants.httpStatusCode.notFound).send({
                    code: constants.responseCodes.notFound,
                    message: "Unit does not exist"
                })
            }

            const unitUpdated = await unit.updateUnit({
                unit_name,
                unit_desc,
                user
            });

            if (unitUpdated.unit_id) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Unit updated successfully",
                    data: unitUpdated
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
            message: "Incomplete Data"
        })
    }
}

// Refer the above logic PLS.

//TODO: Need to check if the unit is used in any product
service.deleteUnit = async function (req, res) {
    if (schemas.validate(req, schemas.unitDetails)) {
        try {
            const unitDeleted = await unit.deleteUnit(req);

            if (unitDeleted.is_deleted) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.successfulOperation,
                    message: "Unit deleted successfully",
                    data: unitDeleted
                })
            } else if (unitDeleted.deleted_once) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.failedOperation,
                    message: unitDeleted.deleted_once
                })
            } else if (unitDeleted.same_value) {
                res.status(constants.httpStatusCode.success).send({
                    code: constants.responseCodes.failedOperation,
                    message: unitDeleted.same_value
                })
            } else {
                res.status(constants.httpStatusCode.failedOperation).send({
                    code: constants.responseCodes.failedOperation,
                    message: unitDeleted.error
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
            message: "Incomplete Data"
        })
    }
}


module.exports = service
