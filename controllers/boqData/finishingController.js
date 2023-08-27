const asyncHandler = require('express-async-handler')

const Finishing =require('../../models/boqModels/FinishingModel')

// @desc Get all finishing add
// @route GET /api/finishing
// @access private
const getAllFinishings =asyncHandler( async(req,res)=>{
  const finishing = await Finishing.find()
    res.status(200).json(finishing)
}
) 



// @desc  create the finishing
// @route POST /api/finishing
// @access private
const setFinishing =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Finishing.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const finishing = await Finishing.create(req.body)
    res.status(200).json(finishing)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update finishing using the map id
// @route PUT /api/finishing/:id
// @access private
const updateFinishing = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Finishing.findById(materialId);

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
// @desc  get single   finishing detail using  id
// @route GET /api/finishing/:id
// @access  private
const getFinishing = asyncHandler( async(req,res)=>{
    const finishing = await Finishing.findById(req.params.id)
    res.status(200).json(finishing)
})

// @desc  Delete single finishing detail
// @route DELETE /api/finishing/:id
// @access private
const deleteFinishing = asyncHandler( async(req,res)=>{
    const finishing = await Finishing.findById(req.params.id)

    // check for the finishing
    if(!finishing){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Finishing.findOneAndDelete(req.params.id)
    res.status(200).json("finishing successfully deleted")
})
module.exports ={getAllFinishings, getFinishing,updateFinishing, setFinishing, deleteFinishing}