const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../../utils/logger')
const _validator = new Validator()

const schemas = function () {
}

schemas.getMasterCategories = {
    id: '/getMasterCategoryDetails',
    type: 'object',
    properties: {
        master_category_id: {
            type: 'integer',
            required: false
        }
    }
}

schemas.createMasterCategory = {
    id: '/createMasterCategory',
    type: 'object',
    properties: {
        master_category_name: {
            type: 'string',
            required: true,
            maxLength: 200
        },
        master_category_description: {
            type: 'string',
            required: false
        }
    }
}

schemas.updateMasterCategory = {
    id: '/updateMasterCategory',
    type: 'object',
    properties: {
        master_category_id: {
            type: 'integer',
            required: true
        },
        master_category_name: {
            type: 'string',
            required: false,
            maxLength: 200
        },
        master_category_description: {
            type: 'string',
            required: false
        },
        is_active: {
            type: ['boolean', 'integer'],
            required: false
        }
    }
}

schemas.validate = function (object, schema) {
    const errors = _validator.validate(object, schema).errors
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors))
    }
    return errors.length <= 0
}

module.exports = schemas
