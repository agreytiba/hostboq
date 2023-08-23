const express = require('express')
const router = express.Router();
 const {getOrder, getOrders, setOrder, updateOrder,deleteOrder} = require("../controllers/orderController")

//   get orders , setOrder have the same root address("/")
router.route('/').get(getOrders).post(setOrder)

// getOrder,updateOrder,deleteOrder have the  same root address('/:id')
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder)

module.exports = router