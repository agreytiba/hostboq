const asyncHandler = require("express-async-handler");

const SavedFinish = require("../../models/savedBoqModels/savedFinishing");

// @desc Get all savedFinishing add
// @route GET /api/savedFinishing
// @access private
const getSavedFinishings = asyncHandler(async (req, res) => {
    const saved = await SavedFinish.find().populate("finishData.materialId");
  res.status(200).json(saved);
});

// @desc  create the savedFinishing
// @route POST /api/savedFinishing
// @access private
const setSavedFinishing = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedFinish.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedFinish record if it doesn't exist
    const newSaved = await SavedFinish.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedFinishing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedFinish.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedFinish not found' });
    }

   // Find the index of the existing finishData entry with matching materialId
    const existingIndex = Saved.finishData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.finishData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to finishData array
      Saved.finishData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedFinishing detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedFinishing = asyncHandler(async (req, res) => {
  const data = await SavedFinish.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedFinishing/:id
// @access private
const deleteSavedFinishing = asyncHandler(async (req, res) => {
  const singleData = await SavedFinish.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedFinish.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedFinishings,
  getSavedFinishing,
  updateSavedFinishing,
  setSavedFinishing,
  deleteSavedFinishing,
};
