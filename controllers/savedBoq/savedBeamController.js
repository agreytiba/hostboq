const asyncHandler = require("express-async-handler");

const SavedBeam = require("../../models/savedBoqModels/savedBeamModel");

// @desc Get all SavedBeam add
// @route GET /api/SavedBeam
// @access private
const getSavedBeams = asyncHandler(async (req, res) => {
    const savedData = await SavedBeam.find().populate("beamData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedBeam
// @route POST /api/SavedBeam
// @access private
const setSavedBeam = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedBeam.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedBeam record if it doesn't exist
    const newSaved = await SavedBeam.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedBeam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedBeam.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedBeam not found' });
    }

   // Find the index of the existing beamData entry with matching materialId
    const existingIndex = Saved.beamData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.beamData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to beamData array
      Saved.beamData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedBeam detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedBeam = asyncHandler(async (req, res) => {
  const data = await SavedBeam.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedBeam/:id
// @access private
const deleteSavedBeam = asyncHandler(async (req, res) => {
  const singleData = await SavedBeam.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedBeam.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedBeams,
  getSavedBeam,
  updateSavedBeam,
  setSavedBeam,
  deleteSavedBeam,
};
