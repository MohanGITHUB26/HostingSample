const express = require('express');
const router = express.Router();

// validation
const userValid = require('../validation/user.validation');

// controllers
const userCtrl = require('../controllers/user.controller');

router.route('/register').post(userValid.registerValid, userCtrl.createUser);
router.route('/login').post(userValid.loginValid, userCtrl.userLogin);


module.exports = router;