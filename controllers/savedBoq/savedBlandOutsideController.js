const asyncHandler = require("express-async-handler");

const SavedBlandOutside = require("../../models/savedBoqModels/savedBlandOutsideModel");

// @desc Get all SavedBlandOutside add
// @route GET /api/SavedBlandOutside
// @access private
const getSavedBlandOutsides = asyncHandler(async (req, res) => {
    const savedData = await SavedBlandOutside.find().populate("outsideData.materialId");
  res.status(200).json(savedData);
});


// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedBlandOutside.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedBlandOutside.findByIdAndUpdate(
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
// @desc  create the SavedBlandOutside
// @route POST /api/SavedBlandOutside
// @access private
const setSavedBlandOutside = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedBlandOutside.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedBlandOutside record if it doesn't exist
    const newSaved = await SavedBlandOutside.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedBlandOutside = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedBlandOutside.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedBlandOutside not found' });
    }

   // Find the index of the existing outsideData entry with matching materialId
    const existingIndex = Saved.outsideData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.outsideData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to outsideData array
      Saved.outsideData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedBlandOutside detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedBlandOutside = asyncHandler(async (req, res) => {
  const data = await SavedBlandOutside.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedBlandOutside/:id
// @access private
const deleteSavedBlandOutside = asyncHandler(async (req, res) => {
  const singleData = await SavedBlandOutside.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedBlandOutside.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedBlandOutsides,
  getSavedBlandOutside,
  updateSavedBlandOutside,
  setSavedBlandOutside,
  deleteSavedBlandOutside,
  updateStatus
};
