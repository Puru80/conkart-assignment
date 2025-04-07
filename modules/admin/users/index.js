const service = require('./user-service');

module.exports = function (app) {
    app.post('/admin/register', service.registerUser);
    app.post('/admin/login', service.loginUser);
}
