const userModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schemas = require('./users-schema').schemas();

async function loginUser(email, password) {
    try {
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
        return {success: false, error: error.message};
    }
}

async function registerUser(email, password) {
    try {
        const existingUser = await userModel.findUserByEmail(email);
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
