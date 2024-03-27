const asyncHandler = require("express-async-handler");

const SavedSkimInside = require("../../models/savedBoqModels/savedSkimInsideModel");

// @desc Get all SavedSkimInside add
// @route GET /api/SavedSkimInside
// @access private
const getSavedSkimInsides = asyncHandler(async (req, res) => {
    const savedData = await SavedSkimInside.find().populate("skimData.materialId");
  res.status(200).json(savedData);
});
// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedSkimInside.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedSkimInside.findByIdAndUpdate(
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

// @desc  create the SavedSkimInside
// @route POST /api/SavedSkimInside
// @access private
const setSavedSkimInside = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedSkimInside.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedSkimInside record if it doesn't exist
    const newSaved = await SavedSkimInside.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedSkimInside = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedSkimInside.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedSkimInside not found' });
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



// @desc  get single   SavedSkimInside detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedSkimInside = asyncHandler(async (req, res) => {
  const data = await SavedSkimInside.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedSkimInside/:id
// @access private
const deleteSavedSkimInside = asyncHandler(async (req, res) => {
  const singleData = await SavedSkimInside.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedSkimInside.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedSkimInsides,
  getSavedSkimInside,
  updateSavedSkimInside,
  setSavedSkimInside,
  deleteSavedSkimInside,
  updateStatus
};
