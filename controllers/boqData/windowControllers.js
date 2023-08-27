const asyncHandler = require('express-async-handler')

const Window =require('../../models/boqModels/windowModel')

// @desc Get all window add
// @route GET /api/window
// @access private
const getWindows =asyncHandler( async(req,res)=>{
  const window = await Window.find()
    res.status(200).json(window)
}
) 
// @desc  create the window
// @route POST /api/window
// @access private
const setWindow =asyncHandler(  async(req,res)=>{
   const WindowToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(WindowToAdd)) {
   const insertedData = await Window.insertMany(WindowToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const DataInsert = await Window.create(req.body)
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
const updateWindow = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Window.findById(materialId);

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
const getWindow = asyncHandler( async(req,res)=>{
    const material = await Window.findById(req.params.id)
    res.status(200).json(material)
})

// @desc  Delete single material detail
// @route DELETE /api/window/:id
// @access private
const deleteWindow = asyncHandler( async(req,res)=>{
    const material = await Window.findById(req.params.id)

    // check for the material
    if(!material){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Window.findOneAndDelete(req.params.id)
    res.status(200).json("material successfully deleted")
})
module.exports ={getWindows, getWindow,updateWindow, setWindow, deleteWindow}