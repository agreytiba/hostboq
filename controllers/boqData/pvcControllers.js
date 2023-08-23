const asyncHandler = require('express-async-handler')

const PVC =require('../../models/boqModels/pvcModel')

// @desc Get all pvc add
// @route GET /api/pvc
// @access private
const getAllPvc =asyncHandler( async(req,res)=>{
  const pvc = await PVC.find()
    res.status(200).json(pvc)
}
) 

// @desc  create the pvc
// @route POST /api/pvc
// @access private
const setPvc =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await PVC.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const pvc = await PVC.create(req.body)
    res.status(200).json(pvc)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update pvc using  id
// @route PUT /api/pvc/:id
// @access private
const updatePvc = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await PVC.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: 'material not found' });
    }

    // Update the price field
    material.rate = newRate;

    // Save the updated material
    const updtedMaterial= await material.save();

    res.json(updtedMaterial);
  } catch (error) {
    throw new Error(error)
    
  }

})
// @desc  get single   pvc detail using  id
// @route GET /api/pvc/:id
// @access  private
const getPvc = asyncHandler( async(req,res)=>{
    const pvc = await PVC.findById(req.params.id)
    res.status(200).json(pvc)
})

// @desc  Delete single pvc detail
// @route DELETE /api/pvc/:id
// @access private
const deletePvc = asyncHandler( async(req,res)=>{
    const pvc = await PVC.findById(req.params.id)

    // check for the pvc
    if(!pvc){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await PVC.findOneAndDelete(req.params.id)
    res.status(200).json("pvc successfully deleted")
})
module.exports ={getAllPvc, getPvc,updatePvc, setPvc, deletePvc}