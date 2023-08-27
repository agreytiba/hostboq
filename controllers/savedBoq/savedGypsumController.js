const asyncHandler = require("express-async-handler");

const SavedGypsum = require("../../models/savedBoqModels/savedGypsumModel");

// @desc Get all savedelectrical add
// @route GET /api/savedelectrical
// @access private
const getSavedGypsums = asyncHandler(async (req, res) => {
    const saved = await SavedGypsum.find().populate("gypsumData.materialId");
  res.status(200).json(saved);
});

// @desc  create the savedelectrical
// @route POST /api/savedelectrical
// @access private
const setSavedGypsum = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedGypsum.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedGypsum record if it doesn't exist
    const newSaved = await SavedGypsum.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedGypsum = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedGypsum.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedGypsum not found' });
    }

   // Find the index of the existing gypsumData entry with matching materialId
    const existingIndex = Saved.gypsumData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.gypsumData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to gypsumData array
      Saved.gypsumData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedelectrical detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedGypsum = asyncHandler(async (req, res) => {
  const data = await SavedGypsum.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedelectrical/:id
// @access private
const deleteSavedGypsum = asyncHandler(async (req, res) => {
  const singleData = await SavedGypsum.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedGypsum.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedGypsums,
  getSavedGypsum,
  updateSavedGypsum,
  setSavedGypsum,
  deleteSavedGypsum,
};
