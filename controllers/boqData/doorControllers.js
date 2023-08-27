const asyncHandler = require('express-async-handler')

const Door =require('../../models/boqModels/doorModel')

// @desc Get all door add
// @route GET /api/door
// @access private
const getDoors =asyncHandler( async(req,res)=>{
  const door = await Door.find()
    res.status(200).json(door)
}
) 



// @desc  create the door
// @route POST /api/door
// @access private
const setDoor =asyncHandler(  async(req,res)=>{
   const DoorToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(DoorToAdd)) {
   const insertedData = await Door.insertMany(DoorToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const DataInsert = await Door.create(req.body)
    res.status(200).json(DataInsert)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateDoor = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Door.findById(materialId);

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
const getDoor = asyncHandler( async(req,res)=>{
    const material = await Door.findById(req.params.id)
    res.status(200).json(material)
})

// @desc  Delete single material detail
// @route DELETE /api/door/:id
// @access private
const deleteDoor = asyncHandler( async(req,res)=>{
    const material = await Door.findById(req.params.id)

    // check for the material
    if(!material){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Door.findOneAndDelete(req.params.id)
    res.status(200).json("material successfully deleted")
})
module.exports ={getDoors, getDoor,updateDoor, setDoor, deleteDoor}