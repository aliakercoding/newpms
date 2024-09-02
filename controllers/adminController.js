const { DBConnector } = require("../config/configurations");
module.exports = {
  index: (req, res) => {
    res.render("admin/index");
  },

  // ITEMS CONTROLLING
  listallitemsGetMethod: (req, res) => {
    let sql = `SELECT * FROM ITEMS LEFT JOIN CATALOGS LEFT JOIN SECTIONS LEFT JOIN BRANDS`;
    DBConnector.all(sql, (err, itemrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/listallitems", { itemrows });
    });
  },

  definenewitemGetMethod: (req, res) => {
    let sql = `SELECT * FROM ITEMS LEFT JOIN CATALOGS LEFT JOIN SECTIONS LEFT JOIN BRANDS`;
    DBConnector.all(sql, (err, itemrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/definenewitem", { itemrows });
    });
  },

  definenewitemPostMethod: async (req, res) => {
    function AddNewItem(
      item_barcode,
      item_name,
      item_retail_price,
      item_vat,
      parts_per_item,
      numbers_per_part,
      customer_rewarded_points,
      user_acquired_points,
      catalog_related,
      section_related,
      brand_related,
      require_prescription
    ) {
      return new Promise((resolve, reject) => {
        DBConnector.run(
          `INSERT INTO ITEMS(ITEM_BARCODE,ITEM_NAME,ITEM_RETAIL_PRICE,ITEM_VAT,PARTS_PER_ITEM,NUMBERS_PER_PART,CUSTOMER_REWARDED_POINTS,USER_ACQUIRED_POINTS,CATALOG_ID,SECTION_ID,BRAND_ID,REQUIRE_PRESCRIPTION) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
          item_barcode,
          item_name,
          item_retail_price,
          item_vat,
          parts_per_item,
          numbers_per_part,
          customer_rewarded_points,
          user_acquired_points,
          catalog_related,
          section_related,
          brand_related,
          require_prescription,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
    }

    var prescription_convertor = req.body.BrandSelector ? 1 : 0;
    let item_barcode = req.body.itemBarcode;
    let item_name = req.body.itemName;
    let item_retail_price = req.body.itemPrice;
    let item_vat = req.body.VATvalue;
    let parts_per_item = req.body.itemUits;
    let numbers_per_part = req.body.itemParts;
    let customer_rewarded_points = req.body.AcquiredPoints;
    let user_acquired_points = req.body.UserAcquiredPoints;
    let catalog_related = req.body.CatalogSelector;
    let section_related = req.body.SectionSelector;
    let brand_related = req.body.BrandSelector;
    let require_prescription = prescription_convertor;

    await AddNewItem(
      item_barcode,
      item_name,
      item_retail_price,
      item_vat,
      parts_per_item,
      numbers_per_part,
      customer_rewarded_points,
      user_acquired_points,
      catalog_related,
      section_related,
      brand_related,
      require_prescription
    );

    req.flash("success-message", "تم الإعتماد بنجاح");
    res.redirect("/admin/listallitems");
  },

  edititemsGetMethod: async (req, res) => {
    function getItemsByID(id) {
      return new Promise((resolve, reject) => {
        DBConnector.all(
          `SELECT * FROM ITEMS LEFT JOIN CATALOGS LEFT JOIN SECTIONS LEFT JOIN BRANDS WHERE ITEM_ID=(?)`,
          id,
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          }
        );
      });
    }

    let listITEM = await getItemsByID(req.params.id);
    res.render("admin/edititems", { listITEM });
  },

  // CATALOGS CONTROLLING
  listallcatalogsGetMethod: (req, res) => {
    let sql = `SELECT * FROM CATALOGS`;
    DBConnector.all(sql, (err, catalogrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/listallcatalogs", { catalogrows });
    });
  },

  //SECTIONS CONTROLLING
  listallsectionsGetMethod: (req, res) => {
    let sql = `SELECT * FROM SECTIONS`;
    DBConnector.all(sql, (err, sectionrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/listallsections", { sectionrows });
    });
  },

  // BRANDS CONTROLLING
  listallbrandsGetMethod: (req, res) => {
    let sql = `SELECT * FROM BRANDS`;
    DBConnector.all(sql, (err, brandrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/listallbrands", { brandrows });
    });
  },
};
