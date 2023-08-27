const asyncHandler = require('express-async-handler')

const Tile =require('../../models/boqModels/tileModel')

// @desc Get all tile add
// @route GET /api/tiles
// @access private
const getAllTiles =asyncHandler( async(req,res)=>{
  const tile = await Tile.find()
    res.status(200).json(tile)
}
) 



// @desc  create the tile
// @route POST /api/tiles
// @access private
const setTile =asyncHandler(  async(req,res)=>{
   const dataToAdd = req.body; // Array of material objects  // Insert each material into the collection
if (Array.isArray(dataToAdd)) {
   const insertedData = await Tile.insertMany(dataToAdd);
    res.status(200).json(insertedData);
}
else {
    if (req.body) {
        const tile = await Tile.create(req.body)
    res.status(200).json(tile)
    }
    else {
        res.status(400).json("hakuna data zilizotumwa")
    }
}}   
)
// @desc update tile using the map id
// @route PUT /api/tile/:id
// @access private
const updateTile = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newRate = req.body.newRate; // Assuming you send the new price in the request body
  try {
    // Find the material by its unique identifier
    const material = await Tile.findById(materialId);

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
// @desc  get single   tile detail using  id
// @route GET /api/tiles/:id
// @access  private
const getTile = asyncHandler( async(req,res)=>{
    const tile = await Tile.findById(req.params.id)
    res.status(200).json(tile)
})

// @desc  Delete single tile detail
// @route DELETE /api/tiles/:id
// @access private
const deleteTile = asyncHandler( async(req,res)=>{
    const tile = await Tile.findById(req.params.id)

    // check for the tile
    if(!tile){
        res.status(400)
        throw new Error('ramani haipo')
    }

    await Tile.findOneAndDelete(req.params.id)
    res.status(200).json("tile successfully deleted")
})
module.exports ={getAllTiles, getTile,updateTile, setTile, deleteTile}