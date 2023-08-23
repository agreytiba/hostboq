const asyncHandler = require('express-async-handler')

const Walling =require('../../models/boqModels/wallingModel')

// @desc Get all walling add
// @route GET /api/wallings
// @access private
const getAllWalling =asyncHandler( async(req,res)=>{
  const walling = await Walling.find()
    res.status(200).json(walling)
}
) 



// @desc  create the walling
// @route POST /api/wallings
// @access private
const setWalling =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Walling.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const walling = await Walling.create(req.body)
    res.status(200).json(walling)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update walling using the map id
// @route PUT /api/wallings/:id
// @access private
const updateWalling = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Walling.findById(materialId);

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
// @desc  get single   walling detail using  id
// @route GET /api/wallings/:id
// @access  private
const getWalling = asyncHandler( async(req,res)=>{
    const walling = await Walling.findById(req.params.id)
    res.status(200).json(walling)
})

// @desc  Delete single walling detail
// @route DELETE /api/walling/:id
// @access private
const deleteWalling = asyncHandler( async(req,res)=>{
    const walling = await Walling.findById(req.params.id)

    // check for the walling
    if(!walling){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Walling.findOneAndDelete(req.params.id)
    res.status(200).json("walling successfully deleted")
})
module.exports ={getAllWalling, getWalling,updateWalling, setWalling, deleteWalling}