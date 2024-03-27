const asyncHandler = require("express-async-handler");

const Savedpre = require("../../models/savedBoqModels/savedpreModel");

// @desc Get all savedpre add
// @route GET /api/savedpre
// @access private
const getSavedPres = asyncHandler(async (req, res) => {
    const savedpres = await Savedpre.find().populate("preData.materialId");
  res.status(200).json(savedpres);
});

// @desc  create the savedpre
// @route POST /api/savedpre
// @access private
const setSavedPre = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSavedPre = await Savedpre.findOne({ mapId });

    if (existingSavedPre) {
      // Respond with existing data
      return res.status(200).json(existingSavedPre);
    }

    // Create a new Savedpre record if it doesn't exist
    const newSavedPre = await Savedpre.create(req.body);
    res.status(201).json(newSavedPre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateSavedPre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const savedPre = await Savedpre.findById(id);
    if (!savedPre) {
      return res.status(404).json({ error: 'Savedpre not found' });
    }

   // Find the index of the existing preData entry with matching materialId
    const existingIndex = savedPre.preData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      savedPre.preData[existingIndex].quantity = quantity;
     const updatedSaved= await savedPre.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to preData array
      savedPre.preData.push({ quantity, materialId });
     const createdSaved= await savedPre.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const updateStatusPre = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await Savedpre.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await Savedpre.findByIdAndUpdate(
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

// @desc  get single   savedpre detail using  id
// @route GET /api/materails/:id
// @access  private
const getSavedPre = asyncHandler(async (req, res) => {
  const data = await Savedpre.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/savedpre/:id
// @access private
const deleteSavedPre = asyncHandler(async (req, res) => {
  const singleData = await Savedpre.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Savedpre.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getSavedPres,
  getSavedPre,
  updateSavedPre,
  setSavedPre,
  deleteSavedPre,
  updateStatusPre
};
