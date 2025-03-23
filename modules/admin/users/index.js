const service = require('./user-service');

module.exports = function (app) {
    // API To Fetch Users List With Params
    app.post('/admin/register', service.registerUser());

    // API To Fetch Users List With Params
    app.post('/admin/login', service.loginUser());
}
