const express = require('express')
const router = express.Router();
 const {setTest} = require("../controllers/testController")
router.route('/').post(setTest)


module.exports = router