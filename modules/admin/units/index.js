const service = require('./units-service');

module.exports = function (app) {
    app.post("/admin/unit/create", service.addUnit);
    app.get("/admin/unit/get/all", service.getUnits);
    app.get("/admin/unit/get/details", service.getUnitById);
    app.put("/admin/unit/update", service.updateUnit);
    app.put("/admin/unit/status/manage", service.unitStatusManage);
}
