const asyncHandler = require("express-async-handler");

const SavedSewageIn = require("../../models/savedBoqModels/savedSewageInside");

//get all saved
const getAllSaved = asyncHandler(async (req, res) => {
    const saved = await SavedSewageIn.find().populate("sewageInData.materialId");
  res.status(200).json(saved);
});

// create all saved
const setSaved = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedSewageIn.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedSewageIn record if it doesn't exist
    const newSaved = await SavedSewageIn.create(req.body);
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
    const Saved = await SavedSewageIn.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedSewageIn not found' });
    }

   // Find the index of the existing sewageInData entry with matching materialId
    const existingIndex = Saved.sewageInData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.sewageInData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to sewageInData array
      Saved.sewageInData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// get single saved
const getSavedById = asyncHandler(async (req, res) => {
  const data = await SavedSewageIn.findById(req.params.id);
  res.status(200).json(data);
});


// delete controller
const deleteSaved = asyncHandler(async (req, res) => {
  const singleData = await SavedSewageIn.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedSewageIn.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
 getAllSaved,
  getSavedById,
  updateSaved,
  setSaved,
  deleteSaved,
};
