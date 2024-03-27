const asyncHandler = require("express-async-handler");

const Savedpvc = require("../../models/savedBoqModels/savedPvc");

// @desc Get all savedpvc add
// @route GET /api/savedpvcs
// @access private
const getSavedPvcs = asyncHandler(async (req, res) => {
    const savedpvcs = await savedPvc.find().populate("pvcData.materialId");
  res.status(200).json(savedpvcs);
});


// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await Savedpvc.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await Savedpvc.findByIdAndUpdate(
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
// @desc  create the savedpvcs
// @route POST /api/savedpvcs
// @access private
const setSavedPvc = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSavedPvc = await Savedpvc.findOne({ mapId });

    if (existingSavedPvc) {
      // Respond with existing data
      return res.status(200).json(existingSavedPvc);
    }

    // Create a new Savedpvc record if it doesn't exist
    const newSavedPvc = await Savedpvc.create(req.body);
    res.status(201).json(newSavedPvc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/pvcs/:id
// @access private
const updateSavedPvc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Savedpvc = await Savedpvc.findById(id);
    if (!Savedpvc) {
      return res.status(404).json({ message: 'Savedpvc not found' });
    }

   // Find the index of the existing pvcData entry with matching materialId
    const existingIndex = Savedpvc.pvcData.findIndex(data => data.materialId == materialId);


    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Savedpvc.pvcData[existingIndex].quantity = quantity;
     const updatedSaved= await Savedpvc.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to pvcData array
      Savedpvc.pvcData.push({ quantity, materialId });
     const createdSaved= await Savedpvc.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   savedpvcs detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedPvc = asyncHandler(async (req, res) => {
  const data = await Savedpvc.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedpvcs/:id
// @access private
const deleteSavedPre = asyncHandler(async (req, res) => {
  const singleData = await Savedpvc.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Savedpvc.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedPvcs,
  getSavedPvc,
  updateSavedPvc,
  setSavedPvc,
  deleteSavedPre,
  updateStatus
};
