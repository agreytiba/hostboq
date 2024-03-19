const asyncHandler = require("express-async-handler");

const SavedWaterOut = require("../../models/savedBoqModels/savedWaterOut");

//get all saved
const getAllSaved = asyncHandler(async (req, res) => {
    const saved = await SavedWaterOut.find().populate("waterOutData.materialId");
  res.status(200).json(saved);
});

// create all saved
const setSaved = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedWaterOut.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedWaterOut record if it doesn't exist
    const newSaved = await SavedWaterOut.create(req.body);
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
    const Saved = await SavedWaterOut.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedWaterOut not found' });
    }

   // Find the index of the existing waterOutData entry with matching materialId
    const existingIndex = Saved.waterOutData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.waterOutData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to waterOutData array
      Saved.waterOutData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// get single saved
const getSavedById = asyncHandler(async (req, res) => {
  const data = await SavedWaterOut.findById(req.params.id);
  res.status(200).json(data);
});


// delete controller
const deleteSaved = asyncHandler(async (req, res) => {
  const singleData = await SavedWaterOut.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedWaterOut.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
 getAllSaved,
  getSavedById,
  updateSaved,
  setSaved,
  deleteSaved,
};
