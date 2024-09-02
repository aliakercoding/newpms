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
  router.route('/listallitems')
  .get(adminController.listallitemsGetMethod);

  router.route('/definenewitem')
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

  router.route('/edititems/:id')
  .get(adminController.edititemsGetMethod)

  // CATALOGS ROUTING
  router.route('/listallcatalogs')
  .get(adminController.listallcatalogsGetMethod)


  // SECTIONS ROUTING
  router.route('/listallsections')
  .get(adminController.listallsectionsGetMethod)



  // BRANDS ROUTING
  router.route('/listallbrands')
  .get(adminController.listallbrandsGetMethod)

  module.exports = router;