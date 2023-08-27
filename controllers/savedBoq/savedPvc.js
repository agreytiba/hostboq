const asyncHandler = require("express-async-handler");

const savedPvc = require("../../models/savedBoqModels/savedPvc");

// @desc Get all savedpvc add
// @route GET /api/savedpvcs
// @access private
const getSavedPvcs = asyncHandler(async (req, res) => {
    const savedpvcs = await savedPvc.find().populate("pvcData.materialId");
  res.status(200).json(savedpvcs);
});

// @desc  create the savedpvcs
// @route POST /api/savedpvcs
// @access private
const setSavedPvc = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSavedPvc = await savedPvc.findOne({ mapId });

    if (existingSavedPvc) {
      // Respond with existing data
      return res.status(200).json(existingSavedPvc);
    }

    // Create a new savedPvc record if it doesn't exist
    const newSavedPvc = await savedPvc.create(req.body);
    res.status(201).json(newSavedPvc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/pvcs/:id
// @access private
const updateSavedPvc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const savedPvc = await savedPvc.findById(id);
    if (!savedPvc) {
      return res.status(404).json({ message: 'savedPvc not found' });
    }

   // Find the index of the existing pvcData entry with matching materialId
    const existingIndex = savedPvc.pvcData.findIndex(data => data.materialId == materialId);


    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      savedPvc.pvcData[existingIndex].quantity = quantity;
     const updatedSaved= await savedPvc.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to pvcData array
      savedPvc.pvcData.push({ quantity, materialId });
     const createdSaved= await savedPvc.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedpvcs detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedPvc = asyncHandler(async (req, res) => {
  const data = await savedPvc.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedpvcs/:id
// @access private
const deleteSavedPre = asyncHandler(async (req, res) => {
  const singleData = await savedPvc.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await savedPvc.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedPvcs,
  getSavedPvc,
  updateSavedPvc,
  setSavedPvc,
  deleteSavedPre,
};
