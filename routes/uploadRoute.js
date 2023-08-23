const express = require('express')
const router = express.Router();
 const {setUpload} = require("../controllers/uploadController")

//   getPurchases , setPurchase have the same root address("/")
router.route('/').post(setUpload)


module.exports = router