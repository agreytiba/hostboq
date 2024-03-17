const asyncHandler = require('express-async-handler')

const Order = require('../models/orderPlacedModel')
const Purchase= require('../models/purchasesModel')

// @desc Get all orders
// @route GET /api/orders
// @access private
const getOrders =asyncHandler( async(req,res)=>{
    try {
    const orders = await Order.find().populate('purchaseId').sort({ createdAt: -1 }) // Populate purchase data
    res.json(orders);
  } catch (error) {
  throw new Error(error)
  }
}
) 



// @desc set order
// @route POST /api/orders
// @access private
const setOrder =asyncHandler(  async(req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('please add a text filed')
    }
    const order = await Order.create(data)
    res.status(200).json(order)
}
)
// @desc update order
// @route PUT /api/orders/:id
// @access private
const updateOrder =asyncHandler( async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if (!order) {
         res.status(400)
         throw new Error ('order not found not found')
    }
  
    const updatedorder =await Order.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedorder)
})
// @desc  get single order
// @route GET /api/orders/:id
// @access  private
const getOrder = asyncHandler( async(req,res)=>{
    const order = await Order.findById(req.params.id)
    res.status(200).json(order)
})

// @desc  Delete order
// @route DELETE /api/orders/:id
// @access private
const deleteOrder = asyncHandler( async(req,res)=>{
    const order = await Order.findById(req.params.id)

    // check for the order
    if(!order){
        res.status(400)
        throw new Error(' order not found')
    }

    await order.remove()
    res.status(200).json({id: req.params.id})
})
module.exports ={getOrder,getOrders,setOrder,updateOrder,deleteOrder}