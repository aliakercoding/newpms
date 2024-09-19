const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
}),
  router.route("/")
  .get(adminController.index);

// ITEMS ROUTING
router.route("/items/listallitems")
.get(adminController.listallitemsGetMethod);

router
  .route("/items/definenewitem")
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

router.route("/items/edititems/:id")
.get(adminController.edititemsGetMethod);

// CATALOGS ROUTING
router.route("/catalogs/listallcatalogs")
  .get(adminController.listallcatalogsGetMethod)
  .post(adminController.definenewcatalogPostMethod);

router.route('/catalogs/editcatalogs/:id')
.get(adminController.editcatalogsGetMethod)

// SECTIONS ROUTING
router.route("/sections/listallsections")
.get(adminController.listallsectionsGetMethod)
.post(adminController.definenewsectionPostMethod);

router.route('/sections/editsections/:id')
.get(adminController.editsectionsGetMethod)

// BRANDS ROUTING
router.route("/brands/listallbrands")
.get(adminController.listallbrandsGetMethod)
.post(adminController.definenewbrandPostMethod);

router.route('/brands/editbrands/:id')
.get(adminController.editbrandsGetMethod)

module.exports = router;
