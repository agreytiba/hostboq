const asyncHandler = require('express-async-handler')

const Electrical =require('../../models/boqModels/electricalModel')

// @desc Get all electrical add
// @route GET /api/electrical
// @access private
const getAllElectrical =asyncHandler( async(req,res)=>{
  const electrical = await Electrical.find()
    res.status(200).json(electrical)
}
) 



// @desc  create the electrical
// @route POST /api/electrical
// @access private
const setElectrical =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Electrical.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const electrical = await Electrical.create(req.body)
    res.status(200).json(electrical)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update electrical using the map id
// @route PUT /api/electrical/:id
// @access private
const updateElectrical = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Electrical.findById(materialId);

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
// @desc  get single   electrical detail using  id
// @route GET /api/electrical/:id
// @access  private
const getElectrical = asyncHandler( async(req,res)=>{
    const electrical = await Electrical.findById(req.params.id)
    res.status(200).json(electrical)
})

// @desc  Delete single electrical detail
// @route DELETE /api/electrical/:id
// @access private
const deleteElectrical = asyncHandler( async(req,res)=>{
    const electrical = await Electrical.findById(req.params.id)

    // check for the electrical
    if(!electrical){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Electrical.findOneAndDelete(req.params.id)
    res.status(200).json("electrical successfully deleted")
})
module.exports ={getAllElectrical, getElectrical,updateElectrical, setElectrical, deleteElectrical}