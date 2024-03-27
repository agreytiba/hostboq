const asyncHandler = require("express-async-handler");

const SavedWalling = require("../../models/savedBoqModels/savedWallingModel");

// @desc Get all SavedWallings add
// @route GET /api/SavedWallings
// @access private
const getSavedWallings = asyncHandler(async (req, res) => {
    const saved = await SavedWalling.find().populate("wallData.materialId");
  res.status(200).json(saved);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedWalling.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedWalling.findByIdAndUpdate(
      req.params.id,
      { isSaved:false}, // Update isSaved to true
      { new: true }
      );
      if (updatedMap) {
  
      return res.status(200).json({ message: "edit mode enabled" });
    }
    }
 

   

    return res.status(404).json({ error: "Record not found" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// @desc  create the SavedWallings
// @route POST /api/SavedWallings
// @access private
const setSavedWalling = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedWalling.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedWalling record if it doesn't exist
    const newSaved = await SavedWalling.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedWalling = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedWalling.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedWalling not found' });
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



// @desc  get single   SavedWallings detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedWalling = asyncHandler(async (req, res) => {
  const data = await SavedWalling.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedWallings/:id
// @access private
const deleteSavedWalling = asyncHandler(async (req, res) => {
  const singleData = await SavedWalling.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedWalling.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedWallings,
  getSavedWalling,
  updateSavedWalling,
  setSavedWalling,
  deleteSavedWalling,
  updateStatus
};
