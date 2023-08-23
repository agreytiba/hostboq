const asyncHandler = require('express-async-handler')

const Sub =require('../../models/boqModels/SubstructureModel')

// @desc Get all substructure add
// @route GET /api/substructure
// @access private
const getAllSubstructure =asyncHandler( async(req,res)=>{
  const substructure = await Sub.find()
    res.status(200).json(substructure)
}
) 



// @desc  create the substructure
// @route POST /api/substructure
// @access private
const setSubstructure =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Sub.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const preDataInsert = await Sub.create(req.body)
    res.status(200).json(preDataInsert)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update material using the map id
// @route PUT /api/substructure/:id
// @access private
const updateSubstructure = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Sub.findById(materialId);

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
// @desc  get single   material detail using  id
// @route GET /api/substructure/:id
// @access  private
const getSubstructure = asyncHandler( async(req,res)=>{
    const substructure = await Sub.findById(req.params.id)
    res.status(200).json(substructure)
})

// @desc  Delete single material detail
// @route DELETE /api/substructure/:id
// @access private
const deleteSubstructure = asyncHandler( async(req,res)=>{
    const material = await Sub.findById(req.params.id)

    // check for the material
    if(!material){
        res.status(400)
        throw new Error('material haipo')
    }

    await Sub.findOneAndDelete(req.params.id)
    res.status(200).json("material successfully deleted")
})
module.exports ={getAllSubstructure, getSubstructure,updateSubstructure, setSubstructure, deleteSubstructure}