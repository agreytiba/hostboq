const asyncHandler = require("express-async-handler");

const Shutter = require("../../models/savedBoqModels/saveDoorShutterModel");

// @desc Get all Shutter add
// @route GET /api/Shutter
// @access private
const getShutters = asyncHandler(async (req, res) => {
    const savedElectri = await Shutter.find().populate("shutterData.materialId");
  res.status(200).json(savedElectri);
});

// @desc  create the Shutter
// @route POST /api/Shutter
// @access private
const setShutter = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await Shutter.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new Shutter record if it doesn't exist
    const newSaved = await Shutter.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateShutter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await Shutter.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'Shutter not found' });
    }

   // Find the index of the existing shutterData entry with matching materialId
    const existingIndex = Saved.shutterData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.shutterData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to shutterData array
      Saved.shutterData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   Shutter detail using  id
// @route GET /api/materails/:id
// @access  private
const getShutter = asyncHandler(async (req, res) => {
  const data = await Shutter.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/Shutter/:id
// @access private
const deleteShutter = asyncHandler(async (req, res) => {
  const singleData = await Shutter.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Shutter.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getShutters,
  getShutter,
  updateShutter,
  setShutter,
  deleteShutter,
};
