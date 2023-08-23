const asyncHandler = require('express-async-handler')

const Pre =require('../../models/boqModels/preliminilaryModel')

// @desc Get all preliminilary add
// @route GET /api/preliminilary
// @access private
const getPreliminilarys =asyncHandler( async(req,res)=>{
  const preliminilary = await Pre.find()
    res.status(200).json(preliminilary)
}
) 



// @desc  create the preliminilary
// @route POST /api/preliminilary
// @access private
const setPreliminilary =asyncHandler(  async(req,res)=>{
   const preliminilaryToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(preliminilaryToAdd)) {
   const insertedData = await Pre.insertMany(preliminilaryToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const preDataInsert = await Pre.create(req.body)
    res.status(200).json(preDataInsert)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updatePre = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Pre.findById(materialId);

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
// @route GET /api/materails/:id
// @access  private
const getPreliminilary = asyncHandler( async(req,res)=>{
    const material = await Pre.findById(req.params.id)
    res.status(200).json(material)
})

// @desc  Delete single material detail
// @route DELETE /api/preliminilary/:id
// @access private
const deletePre = asyncHandler( async(req,res)=>{
    const material = await Pre.findById(req.params.id)

    // check for the material
    if(!material){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Pre.findOneAndDelete(req.params.id)
    res.status(200).json("material successfully deleted")
})
module.exports ={getPreliminilarys, getPreliminilary,updatePre, setPreliminilary, deletePre}