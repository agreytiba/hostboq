const asyncHandler = require('express-async-handler')

const Gypsum =require('../../models/boqModels/gysumModel')

// @desc Get all gypsum add
// @route GET /api/gypsum
// @access private
const getAllGypsum =asyncHandler( async(req,res)=>{
  const gypsum = await Gypsum.find()
    res.status(200).json(gypsum)
}
) 



// @desc  create the gypsum
// @route POST /api/gypsum
// @access private
const setGypsum =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Gypsum.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const gypsum = await Gypsum.create(req.body)
    res.status(200).json(gypsum)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update gypsum using the map id
// @route PUT /api/gypsum/:id
// @access private
const updateGypsum = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Gypsum.findById(materialId);

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
// @desc  get single   gypsum detail using  id
// @route GET /api/gypsum/:id
// @access  private
const getGypsum = asyncHandler( async(req,res)=>{
    const gypsum = await Gypsum.findById(req.params.id)
    res.status(200).json(gypsum)
})

// @desc  Delete single gypsum detail
// @route DELETE /api/gypsum/:id
// @access private
const deleteGypsum = asyncHandler( async(req,res)=>{
    const gypsum = await Gypsum.findById(req.params.id)

    // check for the gypsum
    if(!gypsum){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Gypsum.findOneAndDelete(req.params.id)
    res.status(200).json("gypsum successfully deleted")
})
module.exports ={getAllGypsum, getGypsum,updateGypsum, setGypsum, deleteGypsum}