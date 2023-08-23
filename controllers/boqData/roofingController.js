const asyncHandler = require('express-async-handler')

const Roofing =require('../../models/boqModels/roofingModel')

// @desc Get all roofing add
// @route GET /api/roofings
// @access private
const getAllRoofing =asyncHandler( async(req,res)=>{
  const roofing = await Roofing.find()
    res.status(200).json(roofing)
}
) 



// @desc  create the roofing
// @route POST /api/wallings
// @access private
const setRoofing =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Roofing.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const roofing = await Roofing.create(req.body)
    res.status(200).json(roofing)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update roofing using the map id
// @route PUT /api/roofings/:id
// @access private
const updateRoofing = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Roofing.findById(materialId);

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
// @desc  get single   roofing detail using  id
// @route GET /api/roofings/:id
// @access  private
const getRoofing = asyncHandler( async(req,res)=>{
    const roofing = await Roofing.findById(req.params.id)
    res.status(200).json(roofing)
})

// @desc  Delete single roofing detail
// @route DELETE /api/roofings/:id
// @access private
const deleteRoofing = asyncHandler( async(req,res)=>{
    const roofing = await Roofing.findById(req.params.id)

    // check for the roofing
    if(!roofing){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Roofing.findOneAndDelete(req.params.id)
    res.status(200).json("roofing successfully deleted")
})
module.exports ={getAllRoofing, getRoofing,updateRoofing, setRoofing, deleteRoofing}