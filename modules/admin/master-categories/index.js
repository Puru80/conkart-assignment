const service = require('./master-categories-service');

module.exports = function (app) {
    app.post("/admin/master/categories/create", service.addUnit);
    app.get("/admin/master/categories/get/all", service.getUnits);
    app.get("/admin/master/categories/get/details", service.getUnitById);
    app.put("/admin/master/categories/update", service.updateUnit);
}
