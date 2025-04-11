module.exports = function (app) {
    require('../modules/admin/users')(app)
    require('../modules/admin/master-categories')(app)
}
