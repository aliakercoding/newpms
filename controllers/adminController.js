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
      res.render("admin/items/listallitems", { itemrows });
    });
  },

  definenewitemGetMethod: (req, res) => {
    let sql = `SELECT * FROM CATALOGS INNER JOIN SECTIONS INNER JOIN BRANDS`;
    DBConnector.all(sql, (err, itemrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/items/definenewitem", { itemrows });
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

    let prescription_convertor = req.body.PrescriptionSwitcher ? 1 : 0;
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
    res.redirect("/admin/items/listallitems");
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

    const [listITEM] = await getItemsByID(req.params.id);

    res.render("admin/items/edititems", { listITEM });
  },

  // CATALOGS CONTROLLING
  listallcatalogsGetMethod: (req, res) => {
    let sql = `SELECT * FROM CATALOGS`;
    DBConnector.all(sql, (err, catalogrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/catalogs/listallcatalogs", { catalogrows });
    });
  },

  definenewcatalogPostMethod: async (req, res) => {
    function AddNewCatalog(catalog_name) {
      return new Promise((resolve, reject) => {
        DBConnector.run(
          `INSERT INTO CATALOGS(CATALOG_NAME) VALUES(?)`,
          catalog_name,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
    }

    let catalog_name = req.body.catalogName;
    await AddNewCatalog(catalog_name);
    req.flash("success-message", "تم الإعتماد بنجاح");
    res.redirect("/admin/catalogs/listallcatalogs");
  },

editcatalogsGetMethod: async (req,res)=>{
  function getCatalogByID(id) {
    return new Promise((resolve, reject) => {
      DBConnector.all(
        `SELECT * FROM CATALOGS WHERE CATALOG_ID=(?)`,
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

  const [listCATALOG] = await getCatalogByID(req.params.id);

  res.render("admin/catalogs/editcatalogs", { listCATALOG });
},

  //SECTIONS CONTROLLING
  listallsectionsGetMethod: (req, res) => {
    let sql = `SELECT * FROM SECTIONS`;
    DBConnector.all(sql, (err, sectionrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/sections/listallsections", { sectionrows });
    });
  },

  definenewsectionPostMethod: async (req, res) => {
    function AddNewSection(section_name) {
      return new Promise((resolve, reject) => {
        DBConnector.run(
          `INSERT INTO SECTIONS(SECTION_NAME) VALUES(?)`,
          section_name,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
    }

    let section_name = req.body.sectionName;
    await AddNewSection(section_name);
    req.flash("success-message", "تم الإعتماد بنجاح");
    res.redirect("/admin/sections/listallsections");
  },

  editsectionsGetMethod: async (req,res)=>{
    function getSectionByID(id) {
      return new Promise((resolve, reject) => {
        DBConnector.all(
          `SELECT * FROM SECTIONS WHERE SECTION_ID=(?)`,
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
  
    const [listSECTION] = await getSectionByID(req.params.id);
  
    res.render("admin/sections/editsections", { listSECTION });
  },

  // BRANDS CONTROLLING
  listallbrandsGetMethod: (req, res) => {
    let sql = `SELECT * FROM BRANDS`;
    DBConnector.all(sql, (err, brandrows) => {
      if (err) {
        console.log(err);
      }
      res.render("admin/brands/listallbrands", { brandrows });
    });
  },

  definenewbrandPostMethod: async (req, res) => {
    function AddNewBrand(brand_name) {
      return new Promise((resolve, reject) => {
        DBConnector.run(
          `INSERT INTO BRANDS(BRAND_NAME) VALUES(?)`,
          brand_name,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
    }

    let brand_name = req.body.brandName;
    await AddNewBrand(brand_name);
    req.flash("success-message", "تم الإعتماد بنجاح");
    res.redirect("/admin/brands/listallbrands");
  },

  editbrandsGetMethod: async (req,res)=>{
    function getBrandByID(id) {
      return new Promise((resolve, reject) => {
        DBConnector.all(
          `SELECT * FROM BRANDS WHERE BRAND_ID=(?)`,
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
  
    const [listBRAND] = await getBrandByID(req.params.id);
  
    res.render("admin/brands/editbrands", { listBRAND });
  },











};
