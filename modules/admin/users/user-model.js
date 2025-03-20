const Users = require("./users-schema");

// Send proper error messages in repository methods.
// Repository methods should not throw errors directly.
// Instead, they should return an object with a success flag and an error message if applicable.
// This way, the controller can handle the error and send an appropriate response to the client.
// This approach allows for better error handling and makes the code more maintainable.

const userModel = function () {
};

export async function findUserByEmail(email) {
    try {
        const user = await Users.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return {success: false, error: "User not found"};
        }
        return {success: true, data: user};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

export async function createUser(userData) {
    try {
        const user = await Users.create(userData);
        return {success: true, data: user};
    } catch (error) {
        return {success: false, error: error.message};
    }
}
