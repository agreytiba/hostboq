const asyncHandler = require("express-async-handler");

const SavedStrip = require("../../models/savedBoqModels/SavedStripModel");

// @desc Get all SavedStrip add
// @route GET /api/SavedStrip
// @access private
const getSavedStrips = asyncHandler(async (req, res) => {
    const savedData = await SavedStrip.find().populate("stripData.materialId");
  res.status(200).json(savedData);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedStrip.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedStrip.findByIdAndUpdate(
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
// @desc  create the SavedStrip
// @route POST /api/SavedStrip
// @access private
const setSavedStrip = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedStrip.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedStrip record if it doesn't exist
    const newSaved = await SavedStrip.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedStrip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedStrip.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedStrip not found' });
    }

   // Find the index of the existing stripData entry with matching materialId
    const existingIndex = Saved.stripData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.stripData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to stripData array
      Saved.stripData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedStrip detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedStrip = asyncHandler(async (req, res) => {
  const data = await SavedStrip.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedStrip/:id
// @access private
const deleteSavedStrip = asyncHandler(async (req, res) => {
  const singleData = await SavedStrip.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedStrip.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedStrips,
  getSavedStrip,
  updateSavedStrip,
  setSavedStrip,
  deleteSavedStrip,
  updateStatus
};
