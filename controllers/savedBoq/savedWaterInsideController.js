const asyncHandler = require("express-async-handler");

const SavedWaterIn = require("../../models/savedBoqModels/savedWaterInside");

//get all saved
const getAllSaved = asyncHandler(async (req, res) => {
    const saved = await SavedWaterIn.find().populate("waterInsideData.materialId");
  res.status(200).json(saved);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedWaterIn.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedWaterIn.findByIdAndUpdate(
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

// create all saved
const setSaved = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedWaterIn.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedWaterIn record if it doesn't exist
    const newSaved = await SavedWaterIn.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});

// update single saved
const updateSaved = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedWaterIn.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedWaterIn not found' });
    }

   // Find the index of the existing waterInsideData entry with matching materialId
    const existingIndex = Saved.waterInsideData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.waterInsideData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to waterInsideData array
      Saved.waterInsideData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// get single saved
const getSavedById = asyncHandler(async (req, res) => {
  const data = await SavedWaterIn.findById(req.params.id);
  res.status(200).json(data);
});


// delete controller
const deleteSaved = asyncHandler(async (req, res) => {
  const singleData = await SavedWaterIn.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedWaterIn.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
 getAllSaved,
  getSavedById,
  updateSaved,
  setSaved,
  deleteSaved,
  updateStatus
};
