const asyncHandler = require("express-async-handler");

const SavedRoofing = require("../../models/savedBoqModels/savedRoofingModel");

// @desc Get all savedroofing add
// @route GET /api/savedroofing
// @access private
const getSavedRoofings = asyncHandler(async (req, res) => {
    const saved = await SavedRoofing.find().populate("roofData.materialId");
  res.status(200).json(saved);
});

// @desc  create the savedroofing
// @route POST /api/savedroofing
// @access private
const setSavedRoofing = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedRoofing.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedRoofing record if it doesn't exist
    const newSaved = await SavedRoofing.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedRoofing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedRoofing.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedRoofing not found' });
    }

   // Find the index of the existing roofData entry with matching materialId
    const existingIndex = Saved.roofData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.roofData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to roofData array
      Saved.roofData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedroofing detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedRoofing = asyncHandler(async (req, res) => {
  const data = await SavedRoofing.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedroofing/:id
// @access private
const deleteSavedRoofing = asyncHandler(async (req, res) => {
  const singleData = await SavedRoofing.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedRoofing.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedRoofings,
  getSavedRoofing,
  updateSavedRoofing,
  setSavedRoofing,
  deleteSavedRoofing,
};
