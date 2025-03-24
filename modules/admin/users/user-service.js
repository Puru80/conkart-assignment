const userModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('./users-schema').schemas;
const constants = require('../../../utils/constants').constants;

const service = function () {
}

service.loginUser = async function (req, res) {
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

        if (validationErrors.length > 0) {
            return res.status(constants.httpStatusCode.badRequest)
                .send({
                    code: constants.responseCodes.badRequest,
                    message: "Validation error",
                    error: validationErrors[0]
                });
        }

        const existingUser = await userModel.findUserByEmail(email);

        console.log("Existing User: ", existingUser);

        if (!existingUser.success) {
            return res.status(constants.httpStatusCode.failedOperation)
                .send({
                    code: constants.responseCodes.failedOperation,
                    message: "Failed to create user",
                    error: existingUser.error
                });
        }

        // Check if user already exists
        if (existingUser.data && existingUser.data.email === email) {
            console.log("Existing User: User already exists");

            return res.status(constants.httpStatusCode.conflict)
                .send({
                    code: constants.responseCodes.conflict,
                    message: "User already exists"
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({email: email, password: hashedPassword});

        if (!user.success) {
            return res.status(constants.httpStatusCode.failedOperation)
                .send({
                    code: constants.responseCodes.failedOperation,
                    message: "Failed to create user",
                    error: user.error
                });
        }

        return res.status(constants.httpStatusCode.success)
            .send({
                code: constants.httpStatusCode.success,
                message: "User registered successfully",
                data: user.data
            });
    } catch (error) {
        console.log("Error Caught: ", error);
        return res.status(constants.httpStatusCode.failedOperation)
            .send({
                code: constants.httpStatusCode.failedOperation,
                message: error.message
            });
    }
}

module.exports = service;
