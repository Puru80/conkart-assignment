const userModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('./users-schema').schemas();
const constants = require('../../../utils/constants').constants;

async function loginUser(req, res) {
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
            .json({
                code: constants.httpStatusCode.failedOperation,
                message: error.message
            });
    }
}

async function registerUser(req, res) {
    try {
        const {email, password} = req.body;
        const validationErrors = schemas.validate(req.body, schemas.userRequest);
        console.log(validationErrors);

        if (validationErrors.length > 0) {
            res.sendStatus(constants.httpStatusCode.badRequest)
                .json({
                    code: constants.responseCodes.badRequest,
                    message: "Validation error",
                    errors: validationErrors
                });
        }

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser.success) {
            res.sendStatus(constants.httpStatusCode.conflict)
                .json({
                    code: constants.responseCodes.conflict,
                    message: "User already exists"
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({email: email, password: hashedPassword});
        if (!user.success) {
            return {success: false, error: user.error};
        }
        return {success: true, data: user.data};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

module.exports = {
    loginUser,
    registerUser
}
