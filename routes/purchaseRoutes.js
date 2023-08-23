const express = require('express')
const router = express.Router();
 const {getPurchase, getPurchases, setPurchase, updatePurchase,deletePurchase} = require("../controllers/purchasesController")

//   getPurchases , setPurchase have the same root address("/")
router.route('/').get(getPurchases).post(setPurchase)

// getPurchase,updatePurchase,deletePurchase have the  same root address('/:id')
router.route('/:id').get(getPurchase).put(updatePurchase).delete(deletePurchase)

module.exports = router