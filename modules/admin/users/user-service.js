const userModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('./users-schema').schemas;
const constants = require('../../../utils/constants').constants;

const service = function(){}

service.loginUser = async function(req, res) {
    try {
        const {email, password} = req.body;
        const user = await userModel.findUserByEmail(email);
        if (!user.success) {
            return {success: false, error: "User not found"};
        }

        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        if (!isPasswordValid) {
            return {success: false, error: "Invalid password"};
        }

        const token = jwt.sign({id: user.data.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return {success: true, token: token};
    } catch (error) {
        return res.status(constants.httpStatusCode.failedOperation)
            .send({
                code: constants.httpStatusCode.failedOperation,
                message: error.message
            });
    }
}

service.registerUser = async function (req, res) {
    try {
        const {email, password} = req.body;
        const validationErrors = schemas.validate(req.body, schemas.userRequest);
        console.log(validationErrors);

        if (validationErrors.length > 0) {
            res.sendStatus(constants.httpStatusCode.badRequest)
                .send({
                    code: constants.responseCodes.badRequest,
                    message: "Validation error",
                    errors: validationErrors
                });
        }

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser.success) {
            res.sendStatus(constants.httpStatusCode.conflict)
                .send({
                    code: constants.responseCodes.conflict,
                    message: "User already exists"
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({email: email, password: hashedPassword});
        if (!user.success) {
            res.sendStatus(constants.httpStatusCode.failedOperation)
                .send({
                    code: constants.responseCodes.failedOperation,
                    message: "Failed to create user",
                    error: user.error
                });
        }

        if (!user.success) {
            return res.status(constants.httpStatusCode.failedOperation)
                .send({
                    code: constants.httpStatusCode.failedOperation,
                    message: user.error
                });
        }
        return {success: true, data: user.data};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

module.exports = service;
