const asyncHandler = require('express-async-handler')

const Plumbing =require('../../models/boqModels/plumbingModel')

// @desc Get all plumbing add
// @route GET /api/plumbing
// @access private
const getPlumbings =asyncHandler( async(req,res)=>{
  const plumbing = await Plumbing.find()
    res.status(200).json(plumbing)
}
) 



// @desc  create the plumbing
// @route POST /api/plumbing
// @access private
const setPlumbing =asyncHandler(  async(req,res)=>{
   const PlumbingToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(PlumbingToAdd)) {
   const insertedData = await Plumbing.insertMany(PlumbingToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const preDataInsert = await Plumbing.create(req.body)
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
const updatePlumbing = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Plumbing.findById(materialId);

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
const getPlumbing = asyncHandler( async(req,res)=>{
    const material = await Plumbing.findById(req.params.id)
    res.status(200).json(material)
})

// @desc  Delete single material detail
// @route DELETE /api/plumbing/:id
// @access private
const deletePlumbing = asyncHandler( async(req,res)=>{
    const material = await Plumbing.findById(req.params.id)

    // check for the material
    if(!material){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Plumbing.findOneAndDelete(req.params.id)
    res.status(200).json("material successfully deleted")
})
module.exports ={getPlumbings, getPlumbing,updatePlumbing, setPlumbing, deletePlumbing}