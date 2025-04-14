const Users = require("../../../models/users").Users;

const userModel = function () {
};

userModel.findUserByEmail = async function (email) {
    try {
        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return {success: true, data: {}, error: "User not found"};
        }

        return {success: true, data: user};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

userModel.createUser = async function (userData) {
    try {
        const user = await Users.create(userData);
        return {success: true, data: user};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

module.exports = userModel;
