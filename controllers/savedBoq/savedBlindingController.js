const asyncHandler = require("express-async-handler");

const SavedBlinding = require("../../models/savedBoqModels/savedBlindingModel");

// @desc Get all SavedBlinding add
// @route GET /api/SavedBlinding
// @access private
const getSavedBlindings = asyncHandler(async (req, res) => {
    const savedData = await SavedBlinding.find().populate("blindData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedBlinding
// @route POST /api/SavedBlinding
// @access private
const setSavedBlinding = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedBlinding.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedBlinding record if it doesn't exist
    const newSaved = await SavedBlinding.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedBlinding = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedBlinding.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedBlinding not found' });
    }

   // Find the index of the existing blindData entry with matching materialId
    const existingIndex = Saved.blindData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.blindData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to blindData array
      Saved.blindData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedBlinding detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedBlinding = asyncHandler(async (req, res) => {
  const data = await SavedBlinding.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedBlinding/:id
// @access private
const deleteSavedBlinding = asyncHandler(async (req, res) => {
  const singleData = await SavedBlinding.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedBlinding.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedBlindings,
  getSavedBlinding,
  updateSavedBlinding,
  setSavedBlinding,
  deleteSavedBlinding,
};
