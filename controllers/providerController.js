const asyncHandler = require('express-async-handler')

const Provider =require('../models/ProviderModel')

// @desc Get all provider add
// @route GET /api/provider
// @access private
const getProviders =asyncHandler( async(req,res)=>{
  const provider = await Provider.find()
    res.status(200).json(provider)
}
) 



// @desc  create the provider
// @route POST /api/provider
// @access private
const setProvider =asyncHandler(  async(req,res)=>{
    const { name} = req.body
    
    const provderSearch = await Provider.findOne({ name: name })
    if (provderSearch) {
          res.status(400)
         throw new Error ('bidhaa ipo tayar kweny mfumo')
    }
    
    const ProviderDetails = await Provider.create(req.body)
    res.status(200).json(ProviderDetails)
}
)
// @desc update provider using the map id
// @route PUT /api/materails/:id
// @access private
const updateProvider =asyncHandler( async(req,res)=>{
    const provider = await Provider.findById(req.params.id)
    if (!provider) {
         res.status(400)
         throw new Error (' hii ramani haipo')
    }
  
    const updatedProvider =await Provider.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedProvider)
})
// @desc  get single   provider detail using  id
// @route GET /api/materails/:id
// @access  private
const getProvider = asyncHandler( async(req,res)=>{
    const provider = await Provider.findById(req.params.id)
    res.status(200).json(provider)
})

// @desc  Delete single provider detail
// @route DELETE /api/provider/:id
// @access private
const deleteProvider = asyncHandler( async(req,res)=>{
    const provider = await Provider.findById(req.params.id)

    // check for the provider
    if(!provider){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Provider.findOneAndDelete(req.params.id)
    res.status(200).json("provider successfully deleted")
})
module.exports ={getProviders, getProvider,updateProvider, setProvider, deleteProvider}