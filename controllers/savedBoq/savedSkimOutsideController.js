const asyncHandler = require("express-async-handler");

const SavedSkimOutside = require("../../models/savedBoqModels/savedSkimOutsideModel");

// @desc Get all SavedSkimOutside add
// @route GET /api/SavedSkimOutside
// @access private
const getSavedSkimOutsides = asyncHandler(async (req, res) => {
    const savedData = await SavedSkimOutside.find().populate("skimData.materialId");
  res.status(200).json(savedData);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedSkimOutside.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedSkimOutside.findByIdAndUpdate(
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
// @desc  create the SavedSkimOutside
// @route POST /api/SavedSkimOutside
// @access private
const setSavedSkimOutside = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedSkimOutside.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedSkimOutside record if it doesn't exist
    const newSaved = await SavedSkimOutside.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedSkimOutside = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedSkimOutside.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedSkimOutside not found' });
    }

   // Find the index of the existing skimData entry with matching materialId
    const existingIndex = Saved.skimData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.skimData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to skimData array
      Saved.skimData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedSkimOutside detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedSkimOutside = asyncHandler(async (req, res) => {
  const data = await SavedSkimOutside.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedSkimOutside/:id
// @access private
const deleteSavedSkimOutside = asyncHandler(async (req, res) => {
  const singleData = await SavedSkimOutside.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedSkimOutside.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedSkimOutsides,
  getSavedSkimOutside,
  updateSavedSkimOutside,
  setSavedSkimOutside,
  deleteSavedSkimOutside,
  updateStatus
};
