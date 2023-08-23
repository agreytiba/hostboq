const asyncHandler = require('express-async-handler')

const Bland =require('../../models/boqModels/blanderingModel')

// @desc Get all blandering add
// @route GET /api/blandering
// @access private
const getAllBlandering =asyncHandler( async(req,res)=>{
  const blandering = await Bland.find()
    res.status(200).json(blandering)
}
) 



// @desc  create the blandering
// @route POST /api/blandering
// @access private
const setBlandering =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Bland.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const blandering = await Bland.create(req.body)
    res.status(200).json(blandering)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update blandering using the map id
// @route PUT /api/blandering/:id
// @access private
const updateBlandering = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Bland.findById(materialId);

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
// @desc  get single   blandering detail using  id
// @route GET /api/blandering/:id
// @access  private
const getBlandering = asyncHandler( async(req,res)=>{
    const blandering = await Bland.findById(req.params.id)
    res.status(200).json(blandering)
})

// @desc  Delete single blandering detail
// @route DELETE /api/blandering/:id
// @access private
const deleteBlandering = asyncHandler( async(req,res)=>{
    const walling = await Bland.findById(req.params.id)

    // check for the walling
    if(!walling){
        res.status(400)
        throw new Error('error material not found')
    }

    await Bland.findOneAndDelete(req.params.id)
    res.status(200).json("blandering successfully deleted")
})
module.exports ={getAllBlandering, getBlandering,updateBlandering, setBlandering, deleteBlandering}