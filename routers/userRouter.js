const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.all("/*", (req, res, next) => {
    req.app.locals.layout = "user";
  
    next();
  }),
      
router.route('/')
    .get(userController.index);

router.route('/login')
    .get(userController.loginMethodGet)
    .post(userController.loginMethodPost);

router.route('/addnewuser')
.get(userController.addnewuserMethodGet);

module.exports = router;