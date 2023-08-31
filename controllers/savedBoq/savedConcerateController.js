const asyncHandler = require("express-async-handler");

const SavedConcrete = require("../../models/savedBoqModels/savedConcreteModel");

// @desc Get all SavedConcrete add
// @route GET /api/SavedConcrete
// @access private
const getSavedConcretes = asyncHandler(async (req, res) => {
    const savedData = await SavedConcrete.find().populate("concreteData.materialId");
  res.status(200).json(savedData);
});

// @desc  create the SavedConcrete
// @route POST /api/SavedConcrete
// @access private
const setSavedConcrete = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedConcrete.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedConcrete record if it doesn't exist
    const newSaved = await SavedConcrete.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedConcrete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedConcrete.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedConcrete not found' });
    }

   // Find the index of the existing concreteData entry with matching materialId
    const existingIndex = Saved.concreteData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.concreteData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to concreteData array
      Saved.concreteData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   SavedConcrete detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedConcrete = asyncHandler(async (req, res) => {
  const data = await SavedConcrete.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/SavedConcrete/:id
// @access private
const deleteSavedConcrete = asyncHandler(async (req, res) => {
  const singleData = await SavedConcrete.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedConcrete.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedConcretes,
  getSavedConcrete,
  updateSavedConcrete,
  setSavedConcrete,
  deleteSavedConcrete,
};
