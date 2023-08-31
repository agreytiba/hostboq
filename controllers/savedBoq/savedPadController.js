const asyncHandler = require("express-async-handler");

const SavedPad = require("../../models/savedBoqModels/savedPadModel");

// @desc Get all SavedPad add
// @route GET /api/SavedPad
// @access private
const getSavedPads = asyncHandler(async (req, res) => {
    const savedData = await SavedPad.find().populate("padData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedPad
// @route POST /api/SavedPad
// @access private
const setSavedPad = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedPad.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedPad record if it doesn't exist
    const newSaved = await SavedPad.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedPad = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedPad.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedPad not found' });
    }

   // Find the index of the existing padData entry with matching materialId
    const existingIndex = Saved.padData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.padData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to padData array
      Saved.padData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedPad detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedPad = asyncHandler(async (req, res) => {
  const data = await SavedPad.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedPad/:id
// @access private
const deleteSavedPad = asyncHandler(async (req, res) => {
  const singleData = await SavedPad.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedPad.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedPads,
  getSavedPad,
  updateSavedPad,
  setSavedPad,
  deleteSavedPad,
};
