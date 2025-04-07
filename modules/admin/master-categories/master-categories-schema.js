const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../../utils/logger')
const _validator = new Validator()

const schemas = function () {
}

schemas.getMasterCategories = {
    id: '/getMasterCategories',
    type: 'object',
    properties: {
        master_category_id: {
            type: ['empty', 'null', 'integer'],
            required: false
        },
        search: {
            type: ['empty', 'null', 'string'],
            required: false
        },
        is_active: {
            type: ['boolean', 'empty', 'null', 'integer'],
            required: false
        },
        sort_by: {
            type: ['empty', 'null', 'string'],
            required: false
        },
        sort_type: {
            type: ['empty', 'null', 'string'],
            required: false
        },
        from_date: {
            type: ['empty', 'null', 'string'],
            required: false
        },
        to_date: {
            type: ['empty', 'null', 'string'],
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
        },
        master_category_sequence: {
            type: ['string', 'integer'],
            required: true
        },
        is_active: {
            type: ['boolean', 'empty', 'null', 'integer'],
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
        master_category_sequence: {
            type: ['string', 'integer'],
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
