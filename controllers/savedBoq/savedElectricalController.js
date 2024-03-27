const asyncHandler = require("express-async-handler");

const SavedElectrical = require("../../models/savedBoqModels/savedElectricalModel");

// @desc Get all savedelectrical add
// @route GET /api/savedelectrical
// @access private
const getSavedElectricals = asyncHandler(async (req, res) => {
    const savedElectri = await SavedElectrical.find().populate("electricData.materialId");
  res.status(200).json(savedElectri);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await SavedElectrical.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await SavedElectrical.findByIdAndUpdate(
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
// @desc  create the savedelectrical
// @route POST /api/savedelectrical
// @access private
const setSavedElectrical = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await SavedElectrical.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new SavedElectrical record if it doesn't exist
    const newSaved = await SavedElectrical.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedElectrical = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await SavedElectrical.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'SavedElectrical not found' });
    }

   // Find the index of the existing electricData entry with matching materialId
    const existingIndex = Saved.electricData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.electricData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to electricData array
      Saved.electricData.push({ quantity, materialId });
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
const getSavedElectrical = asyncHandler(async (req, res) => {
  const data = await SavedElectrical.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedelectrical/:id
// @access private
const deleteSavedElectrical = asyncHandler(async (req, res) => {
  const singleData = await SavedElectrical.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await SavedElectrical.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedElectricals,
  getSavedElectrical,
  updateSavedElectrical,
  setSavedElectrical,
  deleteSavedElectrical,
  updateStatus
};
