const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../../utils/logger')
const _validator = new Validator()

const schemas = function () {
}

schemas.addUnit = {
    id: '/addUnit',
    type: 'object',
    properties: {
        unit_name: {
            type: 'string',
            required: true
        },
        unit_desc: {
            type: 'text',
            required: false
        },
        is_active: {
            type: 'boolean',
            required: false
        }
    }
}

schemas.updateUnit = {
    id: '/updateUnit',
    type: 'object',
    properties: {
        unit_id: {
            type: 'integer',
            required: true
        },
        unit_name: {
            type: 'string',
            required: false
        },
        unit_desc: {
            type: 'text',
            required: false
        },
        is_active: {
            type: ['boolean', 'integer'],
            required: false
        }
    }
}

schemas.statusManage = {
    id: '/statusManage',
    type: 'object',
    properties: {
        is_active: {
            type: ['boolean', 'integer'],
            required: true
        },
        unit_id: {
            type: 'integer',
            required: true
        }
    }
}

schemas.unitDelete = {
    id: '/unitDelete',
    type: 'object',
    properties: {
        unit_id: {
            type: ['integer', 'string'],
            required: true
        }
    }
}

schemas.unitDetails = {
    id: '/unitDetails',
    type: 'object',
    properties: {
        unit_id: {
            type: 'integer',
            required: true
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
