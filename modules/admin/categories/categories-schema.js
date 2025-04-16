const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../../utils/logger')
const _validator = new Validator()

const schemas = function () {
}

schemas.getCategories = {
    id: '/getCategories',
    type: 'object',
    properties: {
        category_id: {
            type: ['empty', 'null', 'integer'],
            required: false
        },
        is_active: {
            type: ['boolean', 'empty', 'null', 'integer'],
            required: false
        },
        page: {
            type: ['empty', 'null', 'string'],
            required: false
        },
        limit: {
            type: ['empty', 'null', 'string'],
            required: false
        }
    }
}

schemas.createCategory = {
    id: '/createCategory',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
            maxLength: 200
        },
        master_category_id: {
            type: ['string', 'integer'],
            required: true
        },
        description: {
            type: 'string',
            required: false
        },
        primary_unit: {
            type: ['string', 'integer'],
            required: true
        },
        secondary_unit: {
            type: ['string', 'integer'],
            required: true
        },
        is_active: {
            type: ['boolean', 'empty', 'null', 'integer'],
            required: false
        },
        measurement: {
            type: ['string', 'integer'],
            required: true
        },
        capacity_name: {
            type: 'string',
            required: true
        },
        minimum_capacity: {
            type: ['integer', 'number', 'string'],
            required: true
        },
        maximum_capacity: {
            type: ['integer', 'number', 'string'],
            required: true
        }
    }
}

schemas.updateCategory = {
    id: '/updateCategory',
    type: 'object',
    properties: {
        category_id: {
            type: 'integer',
            required: true
        },
        name: {
            type: 'string',
            required: false,
            maxLength: 200
        },
        master_category_id: {
            type: ['string', 'integer'],
            required: false
        },
        description: {
            type: 'string',
            required: false
        },
        sequence: {
            type: ['string', 'integer'],
            required: false
        },
        primary_unit: {
            type: ['string', 'integer'],
            required: false
        },
        secondary_unit: {
            type: ['string', 'integer'],
            required: false
        },
        is_active: {
            type: ['boolean', 'empty', 'null', 'integer'],
            required: false
        },
        measurement: {
            type: ['string', 'integer'],
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
