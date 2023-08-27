const asyncHandler = require("express-async-handler");

const SavedPlaster = require("../../models/savedBoqModels/savedPlasteringModel");

// @desc Get all SavedPlaster add
// @route GET /api/SavedPlaster
// @access private
const getSavedPlasters = asyncHandler(async (req, res) => {
    const savedElectri = await SavedPlaster.find().populate("plasterData.materialId");
  res.status(200).json(savedElectri);
});

// @desc  create the SavedPlaster
// @route POST /api/SavedPlaster
// @access private
const setSavedPlaster = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedPlaster.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedPlaster record if it doesn't exist
    const newSaved = await SavedPlaster.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedPlaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedPlaster.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedPlaster not found' });
    }

   // Find the index of the existing plasterData entry with matching materialId
    const existingIndex = Saved.plasterData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.plasterData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to plasterData array
      Saved.plasterData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedPlaster detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedPlaster = asyncHandler(async (req, res) => {
  const data = await SavedPlaster.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedPlaster/:id
// @access private
const deleteSavedPlaster = asyncHandler(async (req, res) => {
  const singleData = await SavedPlaster.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedPlaster.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedPlasters,
  getSavedPlaster,
  updateSavedPlaster,
  setSavedPlaster,
  deleteSavedPlaster,
};
