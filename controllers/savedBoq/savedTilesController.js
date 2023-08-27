const asyncHandler = require("express-async-handler");

const SavedTile = require("../../models/savedBoqModels/savedTileModel");

// @desc Get all savedTiles add
// @route GET /api/savedTiles
// @access private
const getSavedTiles = asyncHandler(async (req, res) => {
    const saved = await SavedTile.find().populate("tileData.materialId");
  res.status(200).json(saved);
});

// @desc  create the savedTiles
// @route POST /api/savedTiles
// @access private
const setSavedTile = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedTile.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedTile record if it doesn't exist
    const newSaved = await SavedTile.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedTile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedTile.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedTile not found' });
    }

   // Find the index of the existing tileData entry with matching materialId
    const existingIndex = Saved.tileData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.tileData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to tileData array
      Saved.tileData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedTiles detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedTile = asyncHandler(async (req, res) => {
  const data = await SavedTile.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedTiles/:id
// @access private
const deleteSavedTile = asyncHandler(async (req, res) => {
  const singleData = await SavedTile.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedTile.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedTiles,
  getSavedTile,
  updateSavedTile,
  setSavedTile,
  deleteSavedTile,
};
