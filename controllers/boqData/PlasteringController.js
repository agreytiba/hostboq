const asyncHandler = require('express-async-handler')

const Plastering =require('../../models/boqModels/plasteringModel')

// @desc Get all plastering add
// @route GET /api/plastering
// @access private
const getAllPlastering =asyncHandler( async(req,res)=>{
  const plastering = await Plastering.find()
    res.status(200).json(plastering)
}
) 



// @desc  create the plastering
// @route POST /api/plastering
// @access private
const setPlastering =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Plastering.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const plastering = await Plastering.create(req.body)
    res.status(200).json(plastering)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update plastering using the map id
// @route PUT /api/plastering/:id
// @access private
const updatePlastering = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Plastering.findById(materialId);

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
// @desc  get single   plastering detail using  id
// @route GET /api/plastering/:id
// @access  private
const getPlastering = asyncHandler( async(req,res)=>{
    const plastering = await Plastering.findById(req.params.id)
    res.status(200).json(plastering)
})

// @desc  Delete single plastering detail
// @route DELETE /api/plastering/:id
// @access private
const deletePlastering = asyncHandler( async(req,res)=>{
    const plastering = await Plastering.findById(req.params.id)

    // check for the plastering
    if(!plastering){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Plastering.findOneAndDelete(req.params.id)
    res.status(200).json("plastering successfully deleted")
})
module.exports ={getAllPlastering, getPlastering,updatePlastering, setPlastering, deletePlastering}