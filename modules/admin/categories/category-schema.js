const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../../utils/logger')
const _validator = new Validator()

const schemas = function () {

}

schemas.categoryRequest = {
    id: '/getCategories',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
            maxLength: 200,
            errorMessage: {
                type: 'Name must be a string'
            }
        },
        description: {
            type: 'string',
            required: false,
            errorMessage: {
                type: 'Description must be a string'
            }
        }
    }
}

schemas.validate = function (object, schema) {
    const validationResult = _validator.validate(object, schema);
    if (validationResult.errors.length > 0) {
        return {success: false, error: validationResult.errors[0].message};
    }
    return {success: true};
}

