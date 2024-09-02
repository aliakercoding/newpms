const sqlite3 = require('sqlite3').verbose();

module.exports = {
  DBConnector: new sqlite3.Database('./db/pms.db' , err=>{
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the database successfully.');
  }),
    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
      res.locals.success_message = req.flash("success-message");
      res.locals.error_message = req.flash("error-message");
      next();
    },
  };
  