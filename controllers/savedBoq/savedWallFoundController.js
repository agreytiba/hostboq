const asyncHandler = require("express-async-handler");

const SavedWallFound = require("../../models/savedBoqModels/savedWallfoundModel");

// @desc Get all SavedWallFound add
// @route GET /api/SavedWallFound
// @access private
const getSavedWallFounds = asyncHandler(async (req, res) => {
    const savedData = await SavedWallFound.find().populate("wallData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedWallFound
// @route POST /api/SavedWallFound
// @access private
const setSavedWallFound = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedWallFound.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedWallFound record if it doesn't exist
    const newSaved = await SavedWallFound.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedWallFound = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedWallFound.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedWallFound not found' });
    }

   // Find the index of the existing wallData entry with matching materialId
    const existingIndex = Saved.wallData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.wallData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to wallData array
      Saved.wallData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedWallFound detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedWallFound = asyncHandler(async (req, res) => {
  const data = await SavedWallFound.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedWallFound/:id
// @access private
const deleteSavedWallFound = asyncHandler(async (req, res) => {
  const singleData = await SavedWallFound.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedWallFound.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedWallFounds,
  getSavedWallFound,
  updateSavedWallFound,
  setSavedWallFound,
  deleteSavedWallFound,
};
