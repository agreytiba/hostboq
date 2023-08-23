const asyncHandler = require('express-async-handler')

const Purchase =require('../models/purchasesModel')

// @desc Get all Purchases
// @route GET /api/purchases
// @access private
const getPurchases =asyncHandler( async(req,res)=>{
  const purchase = await Purchase.find()
    res.status(200).json(purchase)
}
) 



// @desc set purchase
// @route POST /api/purchases
// @access private
const setPurchase =asyncHandler(  async(req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('jaza fomu')
    }
    const purchase = await Purchase.create(data)
    res.status(200).json(purchase)
}
)
// @desc update purchase
// @route PUT /api/purchases/:id
// @access private
const updatePurchase =asyncHandler( async(req,res)=>{
    const purchase = await Purchase.findById(req.params.id)
    if (!purchase) {
         res.status(400)
         throw new Error (' bidhaa haipo')
    }
    
  
    const updated =await Purchase.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updated)
})
// @desc  get single purchase
// @route GET /api/purchases/:id
// @access  private
const getPurchase = asyncHandler( async(req,res)=>{
    const purchase = await Purchase.findById(req.params.id)
    res.status(200).json(purchase)
})

// @desc  Delete purchase
// @route DELETE /api/purchases/:id
// @access private
const deletePurchase = asyncHandler( async(req,res)=>{
    const purchase = await Purchase.findById(req.params.id)

    // check for the purchase
    if(!purchase){
        res.status(400)
        throw new Error('manunuzi hayapo')
    }

  await Purchase.findOneAndDelete(req.params.id)
    res.status(200).json("successfully deleted")
})
module.exports ={getPurchase,getPurchases,setPurchase,updatePurchase,deletePurchase}