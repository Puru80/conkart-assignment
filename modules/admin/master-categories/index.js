const service = require('./master-categories-service');

module.exports = function (app) {
    app.post("/admin/master/categories/create", service.create);
    app.get("/admin/master/categories/get/all", service.getMasterCategories);
    app.get("/admin/master/categories/get/details", service.getMasterCategoryDetails);
    app.put("/admin/master/categories/update", service.updateMasterCategory);
}
