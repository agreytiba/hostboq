const asyncHandler = require("express-async-handler");

const SavedBlandInside = require("../../models/savedBoqModels/savedBlandInside");

// @desc Get all SavedBlandInside add
// @route GET /api/SavedBlandInside
// @access private
const getSavedBlandInsides = asyncHandler(async (req, res) => {
    const savedData = await SavedBlandInside.find().populate("insideData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedBlandInside
// @route POST /api/SavedBlandInside
// @access private
const setSavedBlandInside = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedBlandInside.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedBlandInside record if it doesn't exist
    const newSaved = await SavedBlandInside.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedBlandInside = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedBlandInside.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedBlandInside not found' });
    }

   // Find the index of the existing insideData entry with matching materialId
    const existingIndex = Saved.insideData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.insideData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to insideData array
      Saved.insideData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedBlandInside.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedBlandInside.findByIdAndUpdate(
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

// @desc  get single   SavedBlandInside detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedBlandInside = asyncHandler(async (req, res) => {
  const data = await SavedBlandInside.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedBlandInside/:id
// @access private
const deleteSavedBlandInside = asyncHandler(async (req, res) => {
  const singleData = await SavedBlandInside.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedBlandInside.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedBlandInsides,
  getSavedBlandInside,
  updateSavedBlandInside,
  setSavedBlandInside,
  deleteSavedBlandInside,
  updateStatus
};
