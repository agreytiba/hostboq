const asyncHandler = require('express-async-handler')

const Skim =require('../../models/boqModels/skimmingModel')

// @desc Get all skimming add
// @route GET /api/skimming
// @access private
const getAllSkimming =asyncHandler( async(req,res)=>{
  const skimming = await Skim.find()
    res.status(200).json(skimming)
}
) 



// @desc  create the skimming
// @route POST /api/skimming
// @access private
const setSkimming =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Skim.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const skimming = await Skim.create(req.body)
    res.status(200).json(skimming)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update skimming using the map id
// @route PUT /api/skimming/:id
// @access private
const updateSkimming = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Skim.findById(materialId);

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
// @desc  get single   skimming detail using  id
// @route GET /api/wallings/:id
// @access  private
const getSkimming = asyncHandler( async(req,res)=>{
    const skimming = await Skim.findById(req.params.id)
    res.status(200).json(skimming)
})

// @desc  Delete single skimming detail
// @route DELETE /api/skimming/:id
// @access private
const deleteSkimming = asyncHandler( async(req,res)=>{
    const skimming = await Skim.findById(req.params.id)

    // check for the skimming
    if(!skimming){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Skim.findOneAndDelete(req.params.id)
    res.status(200).json("skimming successfully deleted")
})
module.exports ={getAllSkimming, getSkimming,updateSkimming, setSkimming, deleteSkimming}