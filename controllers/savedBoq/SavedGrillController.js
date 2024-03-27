const asyncHandler = require("express-async-handler");

const Grill = require("../../models/savedBoqModels/savedGrillModel");

// @desc Get all Grill add
// @route GET /api/Grill
// @access private
const getGrills = asyncHandler(async (req, res) => {
    const savedElectri = await Grill.find().populate("grillData.materialId");
  res.status(200).json(savedElectri);
});

// update is Saved state
const updateStatus = asyncHandler(async (req, res) => {
  const { boqStatus } = req.body
  try {
    if (boqStatus === "yes" ) {
         const updatedMap = await Grill.findByIdAndUpdate(
      req.params.id,
      { isSaved: true }, // Update isSaved to true
      { new: true }
      );
       if (updatedMap) {
      return res.status(200).json({ message: "boq completed" });
    }
    }
    else {
      const updatedMap = await Grill.findByIdAndUpdate(
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
// @desc  create the Grill
// @route POST /api/Grill
// @access private
const setGrill = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await Grill.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new Grill record if it doesn't exist
    const newSaved = await Grill.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateGrill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await Grill.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'Grill not found' });
    }

   // Find the index of the existing grillData entry with matching materialId
    const existingIndex = Saved.grillData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.grillData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to grillData array
      Saved.grillData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   Grill detail using  id
// @route GET /api/materails/:id
// @access  private
const getGrill = asyncHandler(async (req, res) => {
  const data = await Grill.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/Grill/:id
// @access private
const deleteGrill = asyncHandler(async (req, res) => {
  const singleData = await Grill.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Grill.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getGrills,
  getGrill,
  updateGrill,
  setGrill,
  deleteGrill,
  updateStatus
};
